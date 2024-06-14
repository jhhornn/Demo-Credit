import { Request, Response } from 'express';
import Services from '../services';

class UserController {
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await Services.UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json();
    }
  } 
}

export default new UserController();
