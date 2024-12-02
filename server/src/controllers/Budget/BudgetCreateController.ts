import { Request, Response } from 'express';
import { BudgetCreateService } from '../../services/Budget/BudgetCreateService';

export class BudgetCreateController {
  async create(request: Request, response: Response): Promise<Response> {
    const { maxAmount } = request.body;

    if (!request.userId) {
      return response.status(401).json({ error: 'User not authenticated' });
    }

    const budgetCreateService = new BudgetCreateService();

    try {
      const budget = await budgetCreateService.createBudget({
        userId: request.userId,
        maxAmount,
      });

      return response.status(201).json(budget);
    } catch (error) {
      return response.status(400).json({
        error:
          error instanceof Error ? error.message : 'Unexpected error occurred',
      });
    }
  }
}
