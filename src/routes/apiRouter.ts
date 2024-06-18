import AuthRouter from './AuthRoutes';
import WalletRouter from './WalletRoutes';
import { Router } from 'express';
import TransactionRouter from './TransactionRoutes';

const apiRouter = Router();

apiRouter.use('/auth', AuthRouter);
apiRouter.use('/wallet', WalletRouter);
apiRouter.use('/transactions', TransactionRouter);

export default apiRouter;
