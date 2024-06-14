import { Router } from 'express';
import Controllers from '../controllers';
import Middlewares from '../middlewares';
import { userSchema }from '../utils/validateSchemas'

const userRouter = Router();

userRouter.post(
    '/users',
    Middlewares.validatorMiddleware(userSchema),
    Middlewares.checkBlacklist, 
    Controllers.UserController.createUser
);


export default userRouter;
