import type { NextFunction, Response } from 'express';
import type { AuthRequest } from '@/types/users/auth.js';
import { verifyAccessToken } from '../utils/jwt.js';

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.get('authorization') || req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (err: unknown) {
    res
      .status(403)
      .json({ message: `Invalid or expired token with error ${err}` });
  }
};
