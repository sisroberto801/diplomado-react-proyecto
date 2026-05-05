import React, {useState} from 'react';
import {Alert, Box, Button, DialogActions, DialogContent, TextField,} from '@mui/material';
import {AddCircle as AddCircleIcon, Edit as EditIcon} from '@mui/icons-material';
import type {CreateTaskInput, UpdateTaskInput} from '../../../models/task.model.ts';

interface TaskFormProps {
  initialData?: CreateTaskInput | UpdateTaskInput;
  onSubmit: (data: CreateTaskInput | UpdateTaskInput) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
  error?: string | null;
  isEdit?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
                                                    initialData,
                                                    onSubmit,
                                                    onCancel,
                                                    loading = false,
                                                    error = null,
                                                    isEdit = false,
                                                  }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [localFormData, setLocalFormData] = useState<CreateTaskInput | UpdateTaskInput>({
    title: initialData?.title || '',
    status: initialData?.status || 'pending',
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!localFormData.title?.trim()) {
      newErrors.title = 'El título es requerido';
    } else if (localFormData.title.length > 100) {
      newErrors.title = 'El título no puede exceder 100 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(localFormData);
    }
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocalFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  return (
    <>
      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{mb: 2}}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Título"
            value={localFormData.title}
            onChange={handleChange('title')}
            error={!!errors.title}
            helperText={errors.title}
            disabled={loading}
            margin="normal"
            required
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{p: 2, gap: 1}}>
        <Button
          onClick={onCancel}
          variant="outlined"
          disabled={loading}
          sx={{minWidth: 120, textTransform: 'none'}}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => onSubmit(localFormData)}
          variant="contained"
          disabled={loading}
          startIcon={!isEdit ? <AddCircleIcon/> : <EditIcon/>}
          sx={{
            minWidth: 120,
            background: isEdit ? '#28a745' : '#007bff',
            color: 'white',
            border: 'none',
            textTransform: 'none',
            '&:hover': {
              background: isEdit ? '#218838' : '#0056b3',
              color: 'white',
            },
            '&:disabled': {
              background: '#6c757d',
              color: 'white',
            }
          }}
        >
          {!isEdit ? 'Nueva Tarea' : (loading ? 'Guardando...' : 'Actualizar')}
        </Button>
      </DialogActions>
    </>
  );
};
