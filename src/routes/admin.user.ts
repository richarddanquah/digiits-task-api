import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

import {
  getAllUsersController,
  updateUserController,
  deleteUserController,
} from '../controllers/user.controller';

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email address
 *         role:
 *           type: string
 *           description: The user's role
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the user was last updated
 * 
 * /api/v1/admin/users:
 *   get:
 *     summary: Get all users (Admin)
 *     tags: [Admin Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized, user is not authenticated
 * 
 *   put:
 *     summary: Update a user by ID (Admin)
 *     tags: [Admin Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The updated username
 *               email:
 *                 type: string
 *                 description: The updated email address
 *               role:
 *                 type: string
 *                 description: The updated role
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized, user is not authenticated
 * 
 *   delete:
 *     summary: Delete a user by ID (Admin)
 *     tags: [Admin Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized, user is not authenticated
 */

// Admin route to get all users
router.get('', authMiddleware, requireRole('admin'), getAllUsersController);

// Admin route to update a user
router.put('/:id', authMiddleware, requireRole('admin'), updateUserController);

// Admin route to delete a user
router.delete(
  '/:id',
  authMiddleware,
  requireRole('admin'),
  deleteUserController,
);

export default router;
