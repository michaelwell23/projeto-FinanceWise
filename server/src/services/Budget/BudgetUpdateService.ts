import { BudgetRepository } from '../../repositories/BudgetRepository';

export class BudgetUpdateService {
  async editBudget(id: string, userId: string, maxAmount: number) {
    const budgetRepository = new BudgetRepository();

    const budget = await budgetRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!budget) {
      throw new Error('Budget not found or not authorized to edit');
    }

    budget.maxAmount = maxAmount;

    await budgetRepository.save(budget);

    return budget;
  }
}
