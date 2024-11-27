import { Request, Response } from 'express';
import { CreateExpenseService } from '../../services/Expense/ExpenseCreateService';

export class ExpenseCreateController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, amount, dueDate, category } = request.body;

    const createExpenseService = new CreateExpenseService();

    if (!request.userId) {
      return response.status(401).json({ error: 'User not authenticated' });
    }

    try {
      const expense = await createExpenseService.execute({
        userId: request.userId,
        name,
        amount,
        dueDate,
        category,
      });
      return response.status(201).json(expense);
    } catch (error) {
      return response.status(500).json({
        error:
          error instanceof Error ? error.message : 'Unexpected error occurred',
      });
    }
  }
}
