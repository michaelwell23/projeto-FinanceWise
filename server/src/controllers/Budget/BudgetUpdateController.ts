import { Request, Response } from 'express';
import { BudgetUpdateService } from '../../services/Budget/BudgetUpdateService';

export class BudgetUpdateController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { maxAmount } = request.body;
    const { userId } = request;

    if (!userId) {
      return response.status(400).json({ error: 'User ID is required' });
    }

    const budgetUpdateService = new BudgetUpdateService();

    try {
      const updatedBudget = await budgetUpdateService.editBudget(
        id,
        userId,
        maxAmount
      );
      return response.status(200).json(updatedBudget);
    } catch (error) {
      return response.status(400).json({
        error:
          error instanceof Error ? error.message : 'Unexpected error occurred',
      });
    }
  }
}
