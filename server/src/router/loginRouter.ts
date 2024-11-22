import { Router } from 'express';
import { AuthController } from '../controllers/Auth/AuthController';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/signin', authController.login);
authRouter.post('/logout', authController.logout);

export default authRouter;
