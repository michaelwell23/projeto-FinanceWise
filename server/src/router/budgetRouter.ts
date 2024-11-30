import { Router } from 'express';

import { BudgetCreateController } from '../controllers/Budget/BudgetCreateController';
import { BudgetGetController } from '../controllers/Budget/BudgetGetAllController';
import { BudgetUpdateController } from '../controllers/Budget/BudgetUpdateController';
import { BudgetDeleteController } from '../controllers/Budget/BudgteDeleteController';

import { authMiddleware } from '../middleware/auth';

const budgetRouter = Router();

const budgetCreateController = new BudgetCreateController();
const budgetGetController = new BudgetGetController();
const budgetDeleteController = new BudgetDeleteController();
const budgetUpdateController = new BudgetUpdateController();

budgetRouter.use(authMiddleware);

budgetRouter.post('/budgets', budgetCreateController.create);
budgetRouter.get('/budget', budgetGetController.getAll);
budgetRouter.put('/budget', budgetUpdateController.update);
budgetRouter.delete('/budget', budgetDeleteController.delete);

export default budgetRouter;
