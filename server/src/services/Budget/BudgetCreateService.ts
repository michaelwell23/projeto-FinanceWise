import { getCustomRepository } from 'typeorm';
import { BudgetRepository } from '../../repositories/BudgetRepository';
import { UserRepository } from '../../repositories/UserRepository';

interface IBudgetRequest {
  userId: string;
  maxAmount: number;
}

export class BudgetCreateService {
  public async createBudget({ userId, maxAmount }: IBudgetRequest) {
    const budgetRepository = getCustomRepository(BudgetRepository);
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const budget = budgetRepository.create({ user, maxAmount });
    await budgetRepository.save(budget);

    return budget;
  }
}
