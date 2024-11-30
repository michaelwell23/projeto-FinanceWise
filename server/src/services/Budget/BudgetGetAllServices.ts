import { getCustomRepository } from 'typeorm';
import { BudgetRepository } from '../../repositories/BudgetRepository';

export class BudgetGetService {
  async getAllBudgets(userId: string) {
    const budgetRepository = getCustomRepository(BudgetRepository);

    const budgets = await budgetRepository.find({
      where: { user: { id: userId } },
    });

    if (!budgets.length) {
      throw new Error('No budgets found for this user');
    }

    return budgets;
  }
}
