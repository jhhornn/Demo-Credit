import { Router } from 'express';
import Controllers from '../controllers';
import Middlewares from '../middlewares';

const userRouter = Router();

userRouter.post(
    '/users', 
    Middlewares.checkBlacklist, 
    Controllers.UserController.createUser
);


export default userRouter;
