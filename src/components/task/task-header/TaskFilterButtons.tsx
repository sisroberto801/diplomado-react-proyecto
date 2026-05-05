import React from 'react';
import {Box, Button, ButtonGroup} from '@mui/material';

interface TaskFilterButtonsProps {
  activeFilter: 'all' | 'pending' | 'completed';
  onFilterChange: (filter: 'all' | 'pending' | 'completed') => void;
  taskCounts: {
    all: number;
    pending: number;
    completed: number;
  };
}

export const TaskFilterButtons: React.FC<TaskFilterButtonsProps> = ({
                                                                      activeFilter,
                                                                      onFilterChange,
                                                                      taskCounts,
                                                                    }) => {
  return (
    <Box sx={{mb: 3}}>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button
          onClick={() => onFilterChange('all')}
          sx={{
            backgroundColor: activeFilter === 'all' ? '#007bff' : 'white',
            color: activeFilter === 'all' ? 'white' : 'inherit',
            borderColor: activeFilter === 'all' ? '#007bff' : '#6c757d',
            '&:hover': {
              backgroundColor: activeFilter === 'all' ? '#0056b3' : '#6c757d',
            }
          }}
        >
          Todas ({taskCounts.all})
        </Button>
        <Button
          onClick={() => onFilterChange('pending')}
          sx={{
            backgroundColor: activeFilter === 'pending' ? '#FFC107' : 'white',
            color: activeFilter === 'pending' ? 'black' : 'inherit',
            borderColor: activeFilter === 'pending' ? '#FFC107' : '#6c757d',
            '&:hover': {
              backgroundColor: activeFilter === 'pending' ? '#FFB300' : '#6c757d',
            }
          }}
        >
          Pendiente ({taskCounts.pending})
        </Button>
        <Button
          onClick={() => onFilterChange('completed')}
          sx={{
            backgroundColor: activeFilter === 'completed' ? '#198754' : 'white',
            color: activeFilter === 'completed' ? 'white' : 'inherit',
            borderColor: activeFilter === 'completed' ? '#198754' : '#6c757d',
            '&:hover': {
              backgroundColor: activeFilter === 'completed' ? '#157347' : '#6c757d',
            }
          }}
        >
          Completado ({taskCounts.completed})
        </Button>
      </ButtonGroup>
    </Box>
  );
};
