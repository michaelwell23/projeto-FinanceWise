import { Router } from 'express';
import userRouter from './router/UserRoutes';
import routerAuth from './router/UserAuthenticate';
import commitment from './router/Commitment';

const routes = Router();

routes.use(routerAuth);
routes.use(userRouter);
routes.use(commitment);

export default routes;
