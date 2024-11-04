import { Router } from 'express';
import { AuthController } from '../controllers/Auth/AuthController';
import { authMiddleware } from '../middleware/Authenticate';

const authController = new AuthController();
const userRouter = Router();

userRouter.post('/login', authController.login.bind(authController));

export { userRouter };
