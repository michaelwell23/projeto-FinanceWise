import { Router } from 'express';
import userRouter from './router/UserRoutes';
import routerAuth from './router/UserAuthenticate';

const routes = Router();

routes.use(userRouter);
routes.use(routerAuth);

export default routes;
