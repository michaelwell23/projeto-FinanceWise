import { Router } from 'express';

import routerAuth from './router/UserAuthenticate';
import userRouter from './router/UserRoutes';

const routes = Router();

routes.use(routerAuth);
routes.use(userRouter);

export default routes;
