import React, {useState} from 'react';
import {Box, Button, Card, CardActions, CardContent, Chip, IconButton, Tooltip, Typography,} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  RadioButtonUnchecked as PendingIcon,
} from '@mui/icons-material';
import type {Task, TaskStatusType} from '../../../models/task.model.ts';
import {TaskStatus} from '../../../models/task.model.ts';
import {DeleteTaskModal} from './DeleteTaskModal.tsx';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: TaskStatusType) => void;
  loading?: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({
                                                    task,
                                                    onEdit,
                                                    onDelete,
                                                    onToggleStatus,
                                                    loading = false,
                                                  }) => {
  const isCompleted = task.status === TaskStatus.COMPLETED;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleToggleStatus = () => {
    onToggleStatus(task.id!, task.status);
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };


  return (
    <>
      <Card
        sx={{
          mb: 2,
          backgroundColor: 'white',
          boxShadow: isCompleted
            ? '-4px 0 8px rgba(25, 135, 84, 0.7)'
            : '-4px 0 8px rgba(0, 0, 0, 0.7)',
        }}
      >
        <CardContent>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1}}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                color: 'text.primary',
                flexGrow: 1,
              }}
            >
              {task.title}
            </Typography>

            <Chip
              label={isCompleted ? 'Completada' : 'Pendiente'}
              size="small"
              sx={{
                ml: 2,
                backgroundColor: isCompleted ? '#198754' : '#FFC107',
                color: 'white',
                '&:hover': {
                  backgroundColor: isCompleted ? '#157347' : '#FFB300',
                }
              }}
            />
          </Box>
        </CardContent>

        <CardActions sx={{justifyContent: 'space-between', px: 2, pb: 2}}>
          <Button
            variant="contained"
            size="small"
            startIcon={isCompleted ? <PendingIcon/> : <CheckCircleIcon/>}
            onClick={handleToggleStatus}
            disabled={loading}
            sx={{
              backgroundColor: isCompleted ? '#198754' : '#6c757d',
              color: 'white',
              '&:hover': {
                backgroundColor: isCompleted ? '#157347' : '#5a6268',
              },
              '&:disabled': {
                backgroundColor: '#ccc',
                color: '#666',
              }
            }}
          >
            {isCompleted ? 'Desmarcar' : 'Completar'}
          </Button>

          <Box>
            <Tooltip title="Editar">
              <IconButton
                onClick={handleEdit}
                disabled={loading}
                sx={{
                  mr: 1,
                  backgroundColor: 'white',
                  color: '#2196f3',
                  border: '1px solid #2196f3',
                  borderRadius: '5px',
                  padding: '4px',
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                    borderColor: '#1976d2',
                  },
                  '&:disabled': {
                    borderColor: '#ccc',
                    color: '#666',
                  }
                }}
              >
                <EditIcon/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                onClick={handleDelete}
                disabled={loading}
                sx={{
                  backgroundColor: 'white',
                  color: '#f44336',
                  border: '1px solid #f44336',
                  borderRadius: '5px',
                  padding: '4px',
                  '&:hover': {
                    backgroundColor: '#ffebee',
                    borderColor: '#d32f2f',
                  },
                  '&:disabled': {
                    borderColor: '#ccc',
                    color: '#666',
                  }
                }}
              >
                <DeleteIcon/>
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>
      </Card>

      <DeleteTaskModal
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => {
          onDelete(task.id!);
          setDeleteDialogOpen(false);
        }}
        taskTitle={task.title}
      />
    </>
  );
};
