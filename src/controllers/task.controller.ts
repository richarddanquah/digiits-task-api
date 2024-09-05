import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware'; // Adjust the path as needed
import {
  createTask,
  getTaskById,
  getTasksByUser,
  updateTask,
  deleteTask,
} from '../models/Task';
import knex from 'knex';

// Create a new task
export const createTaskController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const {
    title,
    description,
    status,
    dueDate,
    userId: specifiedUserId,
  } = req.body;
  const requestingUserId = req.userId;
  const role = req.role; // Check user role

  if (!title) return res.status(400).json({ message: 'Title is required' });

  try {
    // If admin, allow task creation for any user, otherwise use the logged-in user's ID
    const taskUserId =
      role === 'admin' && specifiedUserId ? specifiedUserId : requestingUserId;

    const task = await createTask({
      title,
      description,
      status,
      dueDate,
      userId: taskUserId,
    });
    return res.status(200).json(task);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Internal server error', error: err });
  }
};

// Get all tasks for the current user
export const getUserTasksController = async (req: AuthenticatedRequest, res: Response) => {
    const requestingUserId = req.userId;
    const role = req.role;
    const userId = req.query.userId ? Number(req.query.userId) : undefined;
  
    try {
      let tasks;
  
      if (role === 'admin') {
        if (userId) {
          tasks = await getTasksByUser(userId);
        } else {
          tasks = await getTasksByUser();
        }
      } else {
        tasks = await getTasksByUser(requestingUserId);
      }
  
      return res.status(200).json(tasks);
    } catch (err) {
      console.error('Error fetching tasks:', err); // Log the error for debugging
      return res.status(500).json({ message: 'Internal server error', error: err });
    }
  };

// Get a specific task by ID
export const getTaskByIdController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const { id } = req.params;
  const userId = req.userId;
  const role = req.role;

  try {
    const task =
      role === 'admin'
        ? await getTaskById(Number(id)) // Admin can get any task
        : await getTaskById(Number(id), userId); // User can only get their own task

    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.status(200).json(task);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Internal server error', error: err });
  }
};

// Update a task
export const updateTaskController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const { id } = req.params;
  const taskData = req.body;
  const { userId, role } = req;

  try {
    // Admin can update any task, while regular users can only update their own
    const updatedTask =
      role === 'admin'
        ? await updateTask(Number(id), taskData) // Admin: don't pass userId
        : await updateTask(Number(id), taskData, userId); // Regular user: pass userId

    if (!updatedTask) {
      return res
        .status(404)
        .json({ message: 'Task not found or not authorized' });
    }
    return res.status(200).json(updatedTask);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Internal server error', error: err });
  }
};

// Delete a task
export const deleteTaskController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const { id } = req.params;
  const { userId, role } = req;

  try {
    // Admin can delete any task, while regular users can only delete their own
    const deleted =
      role === 'admin'
        ? await deleteTask(Number(id)) // Admin: don't pass userId
        : await deleteTask(Number(id), userId); // Regular user: pass userId

    if (!deleted) {
      return res
        .status(404)
        .json({ message: 'Task not found or not authorized' });
    }
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Internal server error', error: err });
  }
};
