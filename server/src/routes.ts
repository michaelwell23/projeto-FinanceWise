import { Router } from 'express';

import userRoutes from './router/userRouter';
import accountRoutes from './router/accountRouter';
import loginRoutes from './router/loginRouter';
import budgetRoutes from './router/budgetRouter';
import expenseRouter from './router/expenceRouter';

import { authMiddleware } from './middleware/auth';

const routes = Router();

routes.use(userRoutes);
routes.use(loginRoutes);

routes.use(authMiddleware);
routes.use(accountRoutes);
routes.use(expenseRouter);
routes.use(budgetRoutes);

export default routes;
