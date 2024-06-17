import { Router } from 'express';
import Controllers from '../controllers';
import Middlewares from '../middlewares';
import { registerSchema, loginSchema }from '../utils/validateSchemas'

class AuthRouter {
    public router: Router;
  
    constructor() {
      this.router = Router();
      this.routes();
    }
  
    private routes(): void {
      this.router.post('/register',
        Middlewares.validatorMiddleware(registerSchema),
        Middlewares.checkBlacklist,
        Controllers.AuthController.register
    );
      this.router.post('/login',
        Middlewares.validatorMiddleware(loginSchema),
        Controllers.AuthController.login);
    }
}
  
export default new AuthRouter().router;
