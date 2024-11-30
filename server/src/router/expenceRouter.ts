import { Router } from 'express';
import { ExpenseCreateController } from '../controllers/Expense/ExpenseCreateControlle';
import { ExpensesListController } from '../controllers/Expense/ExpenseListController';
import { ExpenseDeleteController } from './../controllers/Expense/ExpenseDeleteControlle';
import { ExpenseUpdateController } from '../controllers/Expense/ExpenseUpdateService';

import { authMiddleware } from '../middleware/auth';

const expenseRouter = Router();

const expenseCreateController = new ExpenseCreateController();
const expensesListController = new ExpensesListController();
const expenseDeleteController = new ExpenseDeleteController();
const expenseUpdateController = new ExpenseUpdateController();

expenseRouter.use(authMiddleware);

expenseRouter.post('/expenses', expenseCreateController.create);
expenseRouter.put('/expenses/:id', expenseUpdateController.update);
expenseRouter.get('/expenses', expensesListController.list);
expenseRouter.delete('/expenses/:id', expenseDeleteController.delete);

export default expenseRouter;
