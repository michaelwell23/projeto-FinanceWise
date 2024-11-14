import { Request, Response } from 'express';
import { ExpenseListService } from '../../services/Expense/ExpenseListService';

export class ListExpensesController {
  async list(request: Request, response: Response): Promise<Response> {
    const userId = request.userId;

    const expenseListService = new ExpenseListService();

    try {
      const expenses = await expenseListService.listExpenses(userId);
      return response.status(200).json(expenses);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
