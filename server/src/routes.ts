import { Router } from 'express';
import userRouter from './router/UserRoutes';

const routes = Router();

routes.use(userRouter);

export default routes;
