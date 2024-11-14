import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../db/repositories/userRepository';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    const user = await UserRepository.findById(payload.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = { id: user.id };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};