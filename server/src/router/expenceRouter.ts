import { Router } from 'express';
// import { ExpenseCreateController } from '../controllers/Expense/ExpenseCreateController';
import { ExpenseListController } from '../controllers/Expense/ExpenseController';
// import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const expenseRouter = Router();

// const expenseCreateController = new ExpenseCreateController();
const expenseListController = new ExpenseListController();

expenseRouter.get(
  '/expenses',
  expenseListController.list.bind(expenseListController)
);

export default expenseRouter;
