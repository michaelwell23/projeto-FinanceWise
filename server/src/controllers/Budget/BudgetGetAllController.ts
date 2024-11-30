import { Request, Response } from 'express';
import { BudgetGetService } from '../../services/Budget/BudgetGetAllServices';

export class BudgetGetController {
  async getAll(request: Request, response: Response): Promise<Response> {
    const { userId } = request;

    if (!userId) {
      return response.status(400).json({ error: 'User ID is required' });
    }

    const budgetGetAllService = new BudgetGetService();

    try {
      const budgets = await budgetGetAllService.getAllBudgets(userId);
      return response.status(200).json(budgets);
    } catch (error) {
      return response.status(400).json({
        error:
          error instanceof Error ? error.message : 'Unexpected error occurred',
      });
    }
  }
}
