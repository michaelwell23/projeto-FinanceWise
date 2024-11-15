import { Router } from 'express';
import { ExpenseCreateController } from '../controllers/Expense/ExpenseCreateControlle';
import { ExpensesListController } from '../controllers/Expense/ExpenseListController';
import { ExpenseDeleteController } from './../controllers/Expense/ExpenseDeleteControlle';
import { ExpenseUpdateController } from '../controllers/Expense/ExpenseUpdateService';

// import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const expenseRouter = Router();

const expenseCreateController = new ExpenseCreateController();
const expensesListController = new ExpensesListController();
const expenseDeleteController = new ExpenseDeleteController();
const expenseUpdateController = new ExpenseUpdateController();

expenseRouter.post(
  '/expenses',
  expenseCreateController.create.bind(expenseCreateController)
);
expenseRouter.put(
  '/expenses/:id',
  expenseUpdateController.update.bind(expenseUpdateController)
);
expenseRouter.get(
  '/expenses',
  expensesListController.list.bind(expensesListController)
);
expenseRouter.delete(
  '/expenses/:id',
  expenseDeleteController.delete.bind(expenseDeleteController)
);

export default expenseRouter;
