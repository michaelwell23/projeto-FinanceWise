import { Request, Response } from 'express';
import { AccountUpdateService } from '../../services/Account/AccountUpdateService';

export class AccountUpdateController {
  private accountUpdateService: AccountUpdateService;

  constructor() {
    this.accountUpdateService = new AccountUpdateService();
    this.update = this.update.bind(this);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, amount, dueDate, category } = request.body;

    try {
      const updatedAccount = await this.accountUpdateService.updateAccount({
        id,
        name,
        amount,
        dueDate,
        category,
      });

      return response.status(200).json(updatedAccount);
    } catch (error) {
      return response.status(400).json({
        error:
          error instanceof Error ? error.message : 'Unexpected error occurred',
      });
    }
  }
}
