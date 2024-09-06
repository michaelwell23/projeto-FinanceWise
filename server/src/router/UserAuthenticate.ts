import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/AuthControllers/LoginUserController';

const routerAuth = Router();

const authenticateUserController = new AuthenticateUserController();

routerAuth.post('/login', authenticateUserController.userLoginAuth);

export default routerAuth;
