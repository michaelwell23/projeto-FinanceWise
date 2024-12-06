import { Request, Response } from 'express';
import { BudgetService } from '../../services/Budget/CheckRamainingBalance';

export class BudgetController {
  async getMonthlyStatus(
    request: Request,
    response: Response
  ): Promise<Response> {
    const userId = request.userId;

    if (!userId) {
      return response.status(400).json({ error: 'User ID is required' });
    }

    const budgetService = new BudgetService();

    try {
      const { balance, alert } = await budgetService.getMonthlyStatus(userId);
      return response.status(200).json({ balance, alert });
    } catch (error) {
      return response.status(400).json({
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }
}
