import { Request, Response } from 'express';
import { AccountDeleteService } from '../../services/Account/AccountDeleteService';

export class AccountDeleteController {
  private accountDeleteService: AccountDeleteService;

  constructor() {
    this.accountDeleteService = new AccountDeleteService();
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      await this.accountDeleteService.deleteAccount(id);
      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({
        error:
          error instanceof Error ? error.message : 'Unexpected error occurred',
      });
    }
  }
}
