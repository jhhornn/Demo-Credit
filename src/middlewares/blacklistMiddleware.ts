import { Request, Response, NextFunction } from 'express';
import { isBlacklisted } from '../utils/blacklistChecker';

export async function checkBlacklist(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email } = req.body;

    // Check if the user is blacklisted by email
    const emailBlacklisted = await isBlacklisted(email);
    if (emailBlacklisted) {
      res.status(403).json({ error: 'Email is blacklisted' });
      return;
    }

    return next();
  } catch (error) {
    res.status(500).json({});
  }
}
