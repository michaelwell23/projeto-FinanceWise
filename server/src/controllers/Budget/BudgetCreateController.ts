import { Request, Response } from 'express';
import { BudgetCreateService } from '../../services/Budget/BudgetCreateService';

export class BudgetCreateController {
  private budgetCreateService: BudgetCreateService;

  constructor() {
    this.budgetCreateService = new BudgetCreateService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { userId } = request;
    const { maxAmount } = request.body;

    try {
      const budget = await this.budgetCreateService.createBudget({
        userId,
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
