import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';

export function requireRole(role: string) {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      if (req.role !== role) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }
      next();
    };
  }
  