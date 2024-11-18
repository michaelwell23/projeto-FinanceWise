import { Request, Response } from 'express';
import { AccountGetService } from '../../services/Account/AccountGetService';

export class AccountGetController {
  async getAll(request: Request, response: Response): Promise<Response> {
    const { userId } = request;

    const accountGetService = new AccountGetService();

    try {
      const accounts = await accountGetService.getAllAccounts(userId);
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

    const accountGetService = new AccountGetService();

    try {
      const account = await accountGetService.getOneAccount(id, userId);
      return response.status(200).json(account);
    } catch (error) {
      return response.status(400).json({
        error:
          error instanceof Error ? error.message : 'Unexpected error occurred',
      });
    }
  }
}
