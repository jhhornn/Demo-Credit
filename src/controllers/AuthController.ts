import { Request, Response, NextFunction } from 'express';
import Services from '../services';
import ResponseHandler from '../utils/responseHandler';
import knex from '../config/db/db';

const authService = new Services.AuthService(knex);

class UserController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await authService.register(req.body);
      new ResponseHandler(res, user, 201, 'User succesfully created');
    } catch (error) {
      next(error);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { identifier, password } = req.body;
      const { user, token } = await authService.login(identifier, password);
      new ResponseHandler(
        res,
        { user, token },
        200,
        'User logged in succesfully'
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
