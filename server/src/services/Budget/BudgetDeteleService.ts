import { BudgetRepository } from '../../repositories/BudgetRepository';

export class BudgetDeleteService {
  async deleteBudget(id: string, userId: string): Promise<void> {
    const budgetRepository = new BudgetRepository();

    const budget = await budgetRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!budget) {
      throw new Error('Budget not found or not authorized to delete');
    }

    await budgetRepository.remove(budget);
  }
}
