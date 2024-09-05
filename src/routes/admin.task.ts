import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import {
  createTaskController,
  getUserTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
} from '../controllers/task.controller';

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The task ID
 *         title:
 *           type: string
 *           description: The task title
 *         description:
 *           type: string
 *           description: A brief description of the task
 *         status:
 *           type: string
 *           enum: [todo, in-progress, done]
 *           description: The status of the task
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: The due date of the task
 *         userId:
 *           type: integer
 *           description: The ID of the user who created the task
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the task was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the task was last updated
 * 
 * /admin/tasks:
 *   post:
 *     summary: Create a new task (Admin)
 *     tags: [Admin Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *                 example: Finish project
 *               description:
 *                 type: string
 *                 description: The task description
 *                 example: Complete the project documentation
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: The due date for the task
 *                 example: 2024-09-15T10:00:00Z
 *               status:
 *                 type: string
 *                 enum: [todo, in-progress, done]
 *     responses:
 *       200:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request, missing required fields
 *       401:
 *         description: Unauthorized, user is not authenticated
 * 
 *   get:
 *     summary: Get all tasks (Admin)
 *     tags: [Admin Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized, user is not authenticated
 * 
 * /admin/tasks/{id}:
 *   get:
 *     summary: Get a specific task by ID (Admin)
 *     tags: [Admin Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the task
 *     responses:
 *       200:
 *         description: Task details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized, user is not authenticated
 * 
 *   put:
 *     summary: Update a task by ID (Admin)
 *     tags: [Admin Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The task title
 *               description:
 *                 type: string
 *                 description: The task description
 *               status:
 *                 type: string
 *                 enum: [todo, in-progress, done]
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized, user is not authenticated
 * 
 *   delete:
 *     summary: Delete a task by ID (Admin)
 *     tags: [Admin Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the task
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized, user is not authenticated
 */


// Ensure you have middleware that authenticates the user and sets req.user
// Create a new task
router.post('/tasks', authMiddleware, requireRole('admin'), createTaskController);

// Get all tasks for the authenticated user
router.get('/tasks', authMiddleware, requireRole('admin'), getUserTasksController);

// Get a specific task by ID
router.get('/tasks/:id', authMiddleware,requireRole('admin'), getTaskByIdController);

// Update a task by ID
router.put('/tasks/:id', authMiddleware,requireRole('admin'), updateTaskController);

// Delete a task by ID
router.delete('/tasks/:id', authMiddleware, requireRole('admin'), deleteTaskController);

export default router;
