import { Request, Response } from 'express';
import { AccountCreateService } from '../../services/Account/AccountCreateService';

export class AccountController {
  private accountService: AccountCreateService;

  constructor() {
    this.accountService = new AccountCreateService();
    this.create = this.create.bind(this);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, amount, dueDate, category } = request.body;
    const userId = request.userId;

    try {
      const account = await this.accountService.createAccount({
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
