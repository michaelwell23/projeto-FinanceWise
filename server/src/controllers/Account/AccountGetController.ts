import { Request, Response } from 'express';
import { AccountGetService } from '../../services/Account/AccountGetService';

export class AccountGetController {
  private accountGetService: AccountGetService;
  list: any;

  constructor() {
    this.accountGetService = new AccountGetService();
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    const { userId } = request;

    try {
      const accounts = await this.accountGetService.getAllAccounts(userId);
      return response.status(200).json(accounts);
    } catch (error) {
      return response.status(400).json({
        error:
          error instanceof Error ? error.message : 'Unexpected error occurred',
      });
    }
  }

  async getOne(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { userId } = request;

    try {
      const account = await this.accountGetService.getOneAccount(id, userId);
      return response.status(200).json(account);
    } catch (error) {
      return response.status(400).json({
        error:
          error instanceof Error ? error.message : 'Unexpected error occurred',
      });
    }
  }
}
