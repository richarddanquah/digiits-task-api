import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

import {
  getAllUsersController,
  updateUserController,
  deleteUserController,
} from '../controllers/user.controller';

const router = express.Router();

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
