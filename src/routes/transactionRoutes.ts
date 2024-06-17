import { Router } from 'express';
import Controllers from '../controllers';
import Middlewares from '../middlewares';


class TransactionRouter {
    public router: Router;
  
    constructor() {
      this.router = Router();
      this.routes();
    }
  
    private routes(): void {
      this.router.use(Middlewares.authMiddleware)
      this.router.get('/:transactionId', Controllers.TransactionController.getTransactionById);
      this.router.get('/wallet/:walletId', Controllers.TransactionController.getTransactionsBywalletId);
      this.router.get('/', Controllers.TransactionController.getTransactionsByUserId);
    }
}

export default new TransactionRouter().router;