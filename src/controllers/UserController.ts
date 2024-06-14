import { Request, Response, NextFunction } from 'express';
import Services from '../services';
import ResponseHandler from '../utils/responseHandler';

class UserController {
  public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await Services.UserService.createUser(req.body);
      new ResponseHandler(res, user, 201, 'User succesfully created')
      // res.status(201).json(user);
    } catch (error) {
      next(error)
    }
  } 
}

export default new UserController();
