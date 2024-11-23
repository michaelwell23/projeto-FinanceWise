import { Request, Response } from 'express';
import { AccountCreateService } from '../../services/Account/AccountCreateService';

export class AccountCreateController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, amount, dueDate, category } = request.body;

    if (!name || !amount || !dueDate || !category) {
      return response.status(400).json({
        error: 'All fields (name, amount, dueDate, and category) are required',
      });
    }

    if (!request.userId) {
      return response.status(401).json({ error: 'User not authenticated' });
    }

    const accountCreateService = new AccountCreateService();

    try {
      const account = await accountCreateService.createAccount({
        userId: request.userId,
        name,
        amount,
        dueDate,
        category,
      });

      return response.status(201).json(account);
    } catch (error) {
      return response.status(500).json({
        error:
          error instanceof Error ? error.message : 'Unexpected error occurred',
      });
    }
  }
}
