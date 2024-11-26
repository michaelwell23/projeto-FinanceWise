import { Router } from 'express';

import { BudgetCreateController } from '../controllers/Budget/BudgetCreateController';

const budgetRouter = Router();

const budgetCreateController = new BudgetCreateController();

budgetRouter.post('/budgets', budgetCreateController.create);

export default budgetRouter;
