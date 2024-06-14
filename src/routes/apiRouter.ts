import userRouter from "./userRoutes";
import { Router } from "express";

const apiRouter = Router()

apiRouter.use('/auth', userRouter)

export default apiRouter