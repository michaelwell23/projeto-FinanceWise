import { Request, Response } from 'express';
import { ExpenseDeleteService } from '../../services/Expense/ExpenseDeleteService';

export class ExpenseDeleteController {
  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const expenseDeleteService = new ExpenseDeleteService();

    try {
      await expenseDeleteService.execute(id);
      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
