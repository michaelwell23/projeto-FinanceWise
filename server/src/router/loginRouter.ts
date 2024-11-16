import { Router } from 'express';
import { AuthController } from '../controllers/Auth/AuthController';

const authController = new AuthController();
const userRouter = Router();

userRouter.post('/signin', authController.login);

export default userRouter;
