import { Request, Response } from 'express';
import { CreateExpenseService } from '../../services/Expense/ExpenseCreateService';

export class ExpenseCreateController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, amount, dueDate, category } = request.body;
    const userId = request.userId;

    const createExpenseService = new CreateExpenseService();

    try {
      const expense = await createExpenseService.execute({
        userId,
        name,
        amount,
        dueDate,
        category,
      });
      return response.status(201).json(expense);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
