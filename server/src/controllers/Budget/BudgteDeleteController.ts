import { Request, Response } from 'express';
import { BudgetDeleteService } from '../../services/Budget/BudgetDeteleService';

export class BudgetDeleteController {
  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { userId } = request;

    if (!userId) {
      return response.status(400).json({ error: 'User ID is required' });
    }

    const budgetDeleteService = new BudgetDeleteService();

    try {
      await budgetDeleteService.deleteBudget(id, userId);
      return response.status(204).send(); 
    } catch (error) {
      return response.status(400).json({
        error:
          error instanceof Error ? error.message : 'Unexpected error occurred',
      });
    }
  }
}
