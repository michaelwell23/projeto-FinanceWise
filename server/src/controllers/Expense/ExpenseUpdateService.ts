import { Request, Response } from 'express';
import { ExpenseUpdateService } from '../../services/Expense/ExpenseUpdateService';

export class UpdateExpenseController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, amount, dueDate, category } = request.body;

    const expenseUpdateService = new ExpenseUpdateService();

    try {
      const updatedExpense = await expenseUpdateService.execute({
        id,
        name,
        amount,
        dueDate,
        category,
      });
      return response.status(200).json(updatedExpense);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
