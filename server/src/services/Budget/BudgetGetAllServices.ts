import { BudgetRepository } from '../../repositories/BudgetRepository';

export class BudgetGetAllService {
  async getAllBudgets(userId: string) {
    const budgetRepository = new BudgetRepository();

    const budgets = await budgetRepository.find({
      where: { user: { id: userId } },
    });

    if (!budgets.length) {
      throw new Error('No budgets found for this user');
    }

    return budgets;
  }
}
