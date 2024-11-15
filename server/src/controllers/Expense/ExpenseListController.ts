import { Request, Response } from 'express';
import { ExpensesListService } from '../../services/Expense/ExpenseListService';

export class ExpensesListController {
  async list(request: Request, response: Response): Promise<Response> {
    const userId = request.userId;

    const expenseListService = new ExpensesListService();

    try {
      const expenses = await expenseListService.execute(userId);
      return response.status(200).json(expenses);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
