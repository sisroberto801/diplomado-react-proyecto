import type {CreateTaskInput, PatchTaskInput, Task, UpdateTaskInput} from '../models/task.model.ts';
import { axiosClient } from '../lib/axiosCliente';

export const useTask = {
  async login(username: string, password: string) {
    try {
      const response = await axiosClient.post('/login', { username, password });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
  async getAllTasks(): Promise<Task[]> {
    try {
      const response = await axiosClient.get('/tasks');
      const apiTasks = response.data.data || [];
      
      // Transform API response to match frontend model
      return apiTasks.map((task: any) => ({
        id: task.id?.toString(),
        title: task.name || '',
        status: task.done ? 'completed' : 'pending',
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      }));
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  async createTask(taskData: CreateTaskInput): Promise<Task> {
    try {
      // Transform frontend data to API format
      const apiData = {
        name: taskData.title,
        done: taskData.status === 'completed',
      };
      
      const response = await axiosClient.post('/tasks', apiData);
      const apiTask = response.data;
      
      // Transform API response back to frontend format
      return {
        id: apiTask.id?.toString(),
        title: apiTask.name || '',
        status: apiTask.done ? 'completed' : 'pending',
        createdAt: apiTask.createdAt,
        updatedAt: apiTask.updatedAt,
      };
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  async updateTask(id: string, taskData: UpdateTaskInput): Promise<Task> {
    try {
      // Transform frontend data to API format
      const apiData = {
        name: taskData.title,
        done: taskData.status === 'completed',
      };
      
      const response = await axiosClient.put(`/tasks/${id}`, apiData);
      const apiTask = response.data;
      
      // Transform API response back to frontend format
      return {
        id: apiTask.id?.toString(),
        title: apiTask.name || '',
        status: apiTask.done ? 'completed' : 'pending',
        createdAt: apiTask.createdAt,
        updatedAt: apiTask.updatedAt,
      };
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  async patchTask(id: string, taskData: PatchTaskInput): Promise<Task> {
    try {
      // Transform frontend data to API format
      const apiData = {
        done: taskData.status === 'completed',
      };
      
      const response = await axiosClient.patch(`/tasks/${id}`, apiData);
      const apiTask = response.data;
      
      // Transform API response back to frontend format
      return {
        id: apiTask.id?.toString(),
        title: apiTask.name || '',
        status: apiTask.done ? 'completed' : 'pending',
        createdAt: apiTask.createdAt,
        updatedAt: apiTask.updatedAt,
      };
    } catch (error) {
      console.error('Error patching task:', error);
      throw error;
    }
  },

  async deleteTask(id: string): Promise<void> {
    try {
      await axiosClient.delete(`/tasks/${id}`);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },
};
