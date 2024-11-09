import { Router } from 'express';
import userRoutes from './router/userRouter';
import accountRoutes from './router/accountRouter';
import loginRouter from './router/loginRoutes';

const routes = Router();

routes.use(userRoutes);
routes.use(accountRoutes);
routes.use(loginRouter);

export default routes;
