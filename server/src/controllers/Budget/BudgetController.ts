import { Request, Response } from 'express';
import { BudgetService } from '../../services/Budget/CheckRamainingBalance';

export class BudgetController {
  private budgetService = new BudgetService();

  async getMonthlyStatus(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const userId = request.userId;

      if (!userId) {
        return response.status(400).json({ error: 'User ID is required' });
      }

      const status = await this.budgetService.getMonthlyStatus(userId);

      return response.status(200).json(status);
    } catch (error) {
      return response.status(400).json({
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }
}
