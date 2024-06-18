import AuthRouter from './AuthRoutes';
import WalletRouter from './WalletRoutes';
import TransactionRouter from './TransactionRoutes';
import { Router } from 'express';

const apiRouter = Router();

apiRouter.use('/auth', AuthRouter);
apiRouter.use('/wallet', WalletRouter);
apiRouter.use('/transactions', TransactionRouter);

export default apiRouter;
