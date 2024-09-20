import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/AuthControllers/LoginUserController';
import { ensureAuthenticated } from '../middleware/auth';

const routerAuth = Router();

const authenticateUserController = new AuthenticateUserController();

routerAuth.post('/signin', authenticateUserController.userLoginAuth);

export default routerAuth;
