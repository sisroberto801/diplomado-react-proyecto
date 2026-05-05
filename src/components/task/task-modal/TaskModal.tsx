import React from 'react';
import {Dialog, DialogContent, DialogTitle,} from '@mui/material';
import {TaskForm} from './TaskForm.tsx';
import type {CreateTaskInput, UpdateTaskInput} from '../../../models/task.model.ts';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: CreateTaskInput | UpdateTaskInput;
  onSubmit: (data: CreateTaskInput | UpdateTaskInput) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  isEdit?: boolean;
  title: string;
}

export const TaskModal: React.FC<TaskModalProps> = ({
                                                      open,
                                                      onClose,
                                                      initialData,
                                                      onSubmit,
                                                      loading = false,
                                                      error = null,
                                                      isEdit = false,
                                                      title,
                                                    }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{
        background: isEdit
          ? 'linear-gradient(to right, #28a745 0%, #20c997 100%)'
          : 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)',
        color: 'white',
        fontSize: '1.2rem',
        fontWeight: 'bold'
      }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <TaskForm
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onClose}
          loading={loading}
          error={error}
          isEdit={isEdit}
        />
      </DialogContent>
    </Dialog>
  );
};
