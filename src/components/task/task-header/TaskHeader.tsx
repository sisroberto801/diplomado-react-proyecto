import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import {AddCircle as AddCircleIcon} from '@mui/icons-material';

interface TaskHeaderProps {
  onCreateTask: () => void;
  title?: string;
}

export const TaskHeader: React.FC<TaskHeaderProps> = ({
                                                        onCreateTask,
                                                        title = 'Mis Tareas',
                                                      }) => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddCircleIcon/>}
        onClick={onCreateTask}
        sx={{
          minWidth: 120,
          background: '#007bff',
          color: 'white',
          border: 'none',
          textTransform: 'none',
          '&:hover': {
            background: '#0056b3',
            color: 'white',
          },
          '&:disabled': {
            background: '#6c757d',
            color: 'white',
          }
        }}
      >
        Nueva Tarea
      </Button>
    </Box>
  );
};
