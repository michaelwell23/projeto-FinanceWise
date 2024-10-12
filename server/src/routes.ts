import { Router } from 'express';

import routerAuth from './router/UserAuthenticate';
import userRouter from './router/UserRoutes';
import emotionRouter from './router/EmotionRoute';
import suggestioRouter from './router/SuggestionRoute';

const routes = Router();

routes.use(routerAuth);
routes.use(userRouter);
routes.use(emotionRouter);
routes.use(suggestioRouter);

export default routes;
