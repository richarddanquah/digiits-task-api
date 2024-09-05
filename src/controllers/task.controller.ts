import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware'; // Adjust the path as needed
import { createTask, getTaskById, getTasksByUser, updateTask, deleteTask } from '../models/Task';

// Create a new task
export const createTaskController = async (req: AuthenticatedRequest, res: Response) => {
  const { title, description, status, dueDate } = req.body;
  const userId = req.userId; // Access userId from the request

  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  if (!title) return res.status(400).json({ message: 'Title is required' });

  try {
    const task = await createTask({ title, description, status, dueDate, userId });
  
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err });
  }
};

// Get all tasks for the current user
export const getUserTasksController = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;

  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const tasks = await getTasksByUser(userId);
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err });
  }
};

// Get a specific task by ID
export const getTaskByIdController = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.userId;

  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const task = await getTaskById(Number(id), userId);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err });
  }
};

// Update a task
export const updateTaskController = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.userId;
  const taskData = req.body;

  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const updatedTask = await updateTask(Number(id), userId, taskData);
    if (!updatedTask) return res.status(404).json({ message: 'Task not found or not authorized' });
    return res.status(200).json(updatedTask);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err });
  }
};

// Delete a task
export const deleteTaskController = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.userId;

  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const deleted = await deleteTask(Number(id), userId);
    if (!deleted) return res.status(404).json({ message: 'Task not found or not authorized' });
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err });
  }
};
