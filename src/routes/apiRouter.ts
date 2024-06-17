import AuthRouter from "./AuthRoutes";
import WalletRouter from "./WalletRoutes";
import transactionRouter from "./transactionRoutes";
import { Router } from "express";

const apiRouter = Router()

apiRouter.use('/auth', AuthRouter)
apiRouter.use('/wallet', WalletRouter)
apiRouter.use('/transactions', transactionRouter)

export default apiRouter