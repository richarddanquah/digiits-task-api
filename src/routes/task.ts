import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import {
  createTaskController,
  getUserTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
} from '../controllers/task.controller';

const router = express.Router();

// Ensure you have middleware that authenticates the user and sets req.user

// Create a new task
router.post('/tasks', authMiddleware, createTaskController);

// Get all tasks for the authenticated user
router.get('/tasks', authMiddleware, getUserTasksController);

// Get a specific task by ID
router.get('/tasks/:id', authMiddleware, getTaskByIdController);

// Update a task by ID
router.put('/tasks/:id', authMiddleware, updateTaskController);

// Delete a task by ID
router.delete('/tasks/:id', authMiddleware, deleteTaskController);

export default router;
