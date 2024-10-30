import { Router } from 'express';
import userRoutes from './router/userRouter';

const routes = Router();

routes.use('/users', userRoutes);

export { routes };
