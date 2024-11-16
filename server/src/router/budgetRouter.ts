import { Router } from 'express';

import { BudgetCreateController } from '../controllers/Budget/BudgetCreateController';
import authMiddleware from '../middleware/auth';

const budgetRouter = Router();

const budgetCreateController = new BudgetCreateController();

budgetRouter.use(authMiddleware);

budgetRouter.post('/budgets', authMiddleware, budgetCreateController.create);

export default budgetRouter;
