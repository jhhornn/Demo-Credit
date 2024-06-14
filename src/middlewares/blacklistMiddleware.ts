import { Request, Response, NextFunction } from 'express';
import { isBlacklisted } from '../utils/blacklistChecker';
import customError from '../utils/customError';

export async function checkBlacklist(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email } = req.body;

    // Check if the user is blacklisted by email
    const emailBlacklisted = await isBlacklisted(email);
    if (emailBlacklisted) {
      throw new customError.ForbiddenResourceError('Email is blacklisted')
    }

    return next();
  } catch (error) {
    next(error)
  }
}
