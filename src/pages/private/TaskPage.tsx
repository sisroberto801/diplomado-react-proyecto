import {useEffect, useState} from 'react';
import {Alert, Container, Snackbar,} from '@mui/material';
import type {CreateTaskInput, Task, TaskStatusType, UpdateTaskInput} from '../../models/task.model';
import {TaskStatus} from '../../models/task.model';
import {useTask} from '../../hooks/useTask.ts';
import {TaskFilterButtons, TaskHeader, TaskList, TaskModal} from '../../components';

interface EditingTask {
  task: Task;
  isOpen: boolean;
}

export const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState<EditingTask>({task: {} as Task, isOpen: false});
  const [formError, setFormError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({open: false, message: '', severity: 'success'});

  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter(task => task.status === TaskStatus.PENDING).length,
    completed: tasks.filter(task => task.status === TaskStatus.COMPLETED).length,
  };

  const filteredTasks = tasks.filter(task => {
    switch (activeFilter) {
      case 'pending':
        return task.status === TaskStatus.PENDING;
      case 'completed':
        return task.status === TaskStatus.COMPLETED;
      default:
        return true;
    }
  });

  const autoLogin = async () => {
    try {
      const loginData = await useTask.login('testing', '123456');
      if (loginData.token) {
        localStorage.setItem('token', loginData.token);
        localStorage.setItem('user', JSON.stringify({username: 'testing'}));
        console.log('Auto-login successful');
        return true;
      }
    } catch (error) {
      console.error('Auto-login failed:', error);
    }
    return false;
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await useTask.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError('Error al cargar las tareas. Por favor, intenta nuevamente.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        const loginSuccess = await autoLogin();
        if (!loginSuccess) {
          setError('No se pudo iniciar sesión automáticamente. Por favor, recarga la página.');
          setLoading(false);
          return;
        }
      }
      await loadTasks();
    };

    const timer = setTimeout(() => {
      initializeApp();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const showSuccessMessage = (message: string) => {
    setSnackbar({open: true, message, severity: 'success'});
  };

  const showErrorMessage = (message: string) => {
    setSnackbar({open: true, message, severity: 'error'});
  };

  const handleSubmit = async (taskData: CreateTaskInput | UpdateTaskInput) => {
    try {
      setFormLoading(true);
      setFormError(null);

      if (editingTask.isOpen) {
        await useTask.updateTask(editingTask.task.id!, taskData as UpdateTaskInput);
        await loadTasks();

        setEditingTask({task: {} as Task, isOpen: false});
        showSuccessMessage('Tarea actualizada exitosamente');
      } else {
        await useTask.createTask(taskData as CreateTaskInput);
        await loadTasks();

        setShowCreateForm(false);
        showSuccessMessage('Tarea creada exitosamente');
      }
    } catch (err) {
      setFormError('Error al guardar la tarea. Por favor, intenta nuevamente.');
      console.error('Error saving task:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: TaskStatusType) => {
    try {
      const newStatus = currentStatus === TaskStatus.PENDING ? TaskStatus.COMPLETED : TaskStatus.PENDING;
      console.log('Toggling task:', id, 'from', currentStatus, 'to', newStatus);

      await useTask.patchTask(id, {status: newStatus});

      await loadTasks();

      showSuccessMessage(`Tarea marcada como ${newStatus === TaskStatus.COMPLETED ? 'completada' : 'pendiente'}`);
    } catch (err) {
      showErrorMessage('Error al cambiar el estado de la tarea');
      console.error('Error toggling task status:', err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      try {
        await useTask.deleteTask(id);

        await loadTasks();

        showSuccessMessage('Tarea eliminada exitosamente');
      } catch (err) {
        showErrorMessage('Error al eliminar la tarea');
        console.error('Error deleting task:', err);
      }
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask({task, isOpen: true});
    setFormError(null);
  };

  const handleCancelEdit = () => {
    setEditingTask({task: {} as Task, isOpen: false});
    setFormError(null);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
    setFormError(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({...prev, open: false}));
  };

  return (
    <Container maxWidth="md" sx={{py: 4}}>
      <TaskHeader onCreateTask={() => setShowCreateForm(true)}/>

      <TaskFilterButtons
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        taskCounts={taskCounts}
      />

      <TaskList
        tasks={filteredTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onToggleStatus={handleToggleStatus}
        loading={loading}
        error={error}
      />

      <TaskModal
        open={editingTask.isOpen}
        onClose={handleCancelEdit}
        initialData={editingTask.task}
        onSubmit={handleSubmit}
        loading={formLoading}
        error={formError}
        isEdit={true}
        title="Editar Tarea"
      />

      <TaskModal
        open={showCreateForm}
        onClose={handleCancelCreate}
        onSubmit={handleSubmit}
        loading={formLoading}
        error={formError}
        isEdit={false}
        title="Nueva Tarea"
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};