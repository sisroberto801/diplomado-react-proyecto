import { z } from 'zod';

export const TaskStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed'
} as const;

export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];

export const taskSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(1, 'El título es requerido')
    .max(100, 'El título no puede exceder 100 caracteres')
    .trim(),
  status: z.enum([TaskStatus.PENDING, TaskStatus.COMPLETED]).default(TaskStatus.PENDING),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const createTaskSchema = taskSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateTaskSchema = taskSchema.omit({ id: true, createdAt: true, updatedAt: true }).partial();
export const patchTaskSchema = z.object({
  status: z.enum([TaskStatus.PENDING, TaskStatus.COMPLETED]),
});

export type Task = z.infer<typeof taskSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type PatchTaskInput = z.infer<typeof patchTaskSchema>;
