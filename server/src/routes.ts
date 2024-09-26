import { Router } from 'express';
import userRouter from './router/UserRoutes';
import routerAuth from './router/UserAuthenticate';

const routes = Router();

routes.use(routerAuth);
routes.use(userRouter);

export default routes;
