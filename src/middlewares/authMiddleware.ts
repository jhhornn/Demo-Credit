import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import customError from '../utils/customError';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new customError.UnAuthorizedError('Access denied, no token provided');
  }

  try {
    const decoded = jwt.verify(token, config.env_var.dev.appConfig.JWT_SECRET);
    if (!decoded) {
      throw new customError.UnAuthorizedError('Invalid token');
    }
    (req as any).user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
