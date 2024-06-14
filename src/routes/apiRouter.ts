import AuthRouter from "./AuthRoutes";
import { Router } from "express";

const apiRouter = Router()

apiRouter.use('/auth', AuthRouter)

export default apiRouter