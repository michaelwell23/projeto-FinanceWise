import { Router } from 'express';
import userRoutes from './router/userRouter';

const routes = Router();

routes.use(userRoutes);

export default routes;
