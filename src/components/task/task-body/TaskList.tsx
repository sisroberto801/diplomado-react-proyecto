import React from 'react';
import {Alert, Box, CircularProgress, Paper, Typography,} from '@mui/material';
import type {Task, TaskStatusType} from '../../../models/task.model.ts';
import {TaskItem} from './TaskItem.tsx';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: TaskStatusType) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export const TaskList: React.FC<TaskListProps> = ({
                                                    tasks,
                                                    onEdit,
                                                    onDelete,
                                                    onToggleStatus,
                                                    loading = false,
                                                    error = null,
                                                  }) => {
  if (loading) {
    return (
      <Box sx={{display: 'flex', justifyContent: 'center', p: 4}}>
        <CircularProgress/>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{mb: 2}}>
        {error}
      </Alert>
    );
  }

  if (tasks.length === 0) {
    return (
      <Paper sx={{p: 4, textAlign: 'center'}}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No hay tareas registradas
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Crea tu primera tarea para comenzar a organizarte
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          loading={loading}
        />
      ))}
    </Box>
  );
};
