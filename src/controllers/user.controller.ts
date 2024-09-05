import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware'; 
import { getAllUsers, updateUser, deleteUser } from '../models/User';


// Fetch all users (Admin only)
export const getAllUsersController = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const users = await getAllUsers();
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error', error: err });
    }
  };
  
  // Update a user (Admin only)
  export const updateUserController = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const userData = req.body;
  
    try {
      const updatedUser = await updateUser(Number(id), userData);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error', error: err });
    }
  };
  
  // Delete a user (Admin only)
  export const deleteUserController = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
  
    try {
      const success = await deleteUser(Number(id));
      if (!success) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error', error: err });
    }
  };
  