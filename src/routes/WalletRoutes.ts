import { Router } from 'express';
import Controllers from '../controllers';
import Middlewares from '../middlewares';


class WalletRouter {
    public router: Router;
  
    constructor() {
      this.router = Router();
      this.routes();
    }
  
    private routes(): void {
      this.router.use(Middlewares.authMiddleware)
      this.router.get('/', Controllers.WalletController.getWallet)
      this.router.post('/fund', Controllers.WalletController.fundWallet);
      this.router.post('/withdraw', Controllers.WalletController.withdraw);
      this.router.post('/transfer', Controllers.WalletController.transfer);
    }
}

export default new WalletRouter().router;