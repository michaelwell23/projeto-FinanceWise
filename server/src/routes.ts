import { Router } from 'express';

import routerAuth from './router/UserAuthenticate';
import userRouter from './router/UserRoutes';
import emotionRouter from './router/EmotionRoute';

const routes = Router();

routes.use(routerAuth);
routes.use(userRouter);
routes.use(emotionRouter);

export default routes;
