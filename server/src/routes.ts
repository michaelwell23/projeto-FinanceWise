import { Router } from 'express';

import userRoutes from './router/userRouter';
import accountRoutes from './router/accountRouter';
import loginRoutes from './router/loginRouter';
import budgetRoutes from './router/budgetRouter';
import expenseRouter from './router/expenceRouter';

const routes = Router();

routes.use(userRoutes);
routes.use(loginRoutes);
routes.use(accountRoutes);
routes.use(expenseRouter);
routes.use(budgetRoutes);

export default routes;
