import { Request, Response } from 'express';
import { AccountCreateService } from '../../services/Account/AccountCreateService';

export class AccountCreateController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, amount, dueDate, category } = request.body;
    const userId = request.userId;

    const accountCreateService = new AccountCreateService();

    try {
      const account = await accountCreateService.createAccount({
        userId,
        name,
        amount,
        dueDate,
        category,
      });

      return response.status(201).json(account);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
