import { Router } from 'express';
import Controllers from '../controllers';
import Middlewares from '../middlewares';
import { transactionSchema } from '../utils/validateSchemas';

class WalletRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.use(Middlewares.authMiddleware);
    this.router.get('/', Controllers.WalletController.getWallet);
    this.router.post(
      '/fund',
      Middlewares.validatorMiddleware(transactionSchema),
      Controllers.WalletController.fundWallet
    );
    this.router.post(
      '/withdraw',
      Middlewares.validatorMiddleware(transactionSchema),
      Controllers.WalletController.withdraw
    );
    this.router.post(
      '/transfer',
      Middlewares.validatorMiddleware(transactionSchema),
      Controllers.WalletController.transfer
    );
  }
}

export default new WalletRouter().router;
