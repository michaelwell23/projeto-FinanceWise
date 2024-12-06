import { getCustomRepository } from 'typeorm';
import { AccountRepository } from '../../repositories/AccountRepository';
import { BudgetRepository } from '../../repositories/BudgetRepository';

export class BudgetService {
  async getMonthlyStatus(
    userId: string
  ): Promise<{ balance: number; alert?: string }> {
    const budgetRepository = getCustomRepository(BudgetRepository);
    const accountRepository = getCustomRepository(AccountRepository);

    const budget = await budgetRepository.findOne({
      where: { user: { id: userId } },
    });

    if (
      !budget ||
      budget.maxAmount === undefined ||
      budget.maxAmount === null
    ) {
      throw new Error('Valid budget not found for this user');
    }

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const expenses = await accountRepository
      .createQueryBuilder('account')
      .where('account.userId = :userId', { userId })
      .andWhere('MONTH(account.dueDate) = :currentMonth', { currentMonth })
      .andWhere('YEAR(account.dueDate) = :currentYear', { currentYear })
      .getMany();

    const totalExpenses = expenses.reduce(
      (sum, account) => sum + Number(account.amount || 0),
      0
    );

    const balance = Number(budget.maxAmount) - totalExpenses;

    let alert: string | undefined;
    if (balance < 0) {
      alert = 'Alert: Your expenses have exceeded your budget!';
    } else if (balance < budget.maxAmount * 0.2) {
      alert = 'Warning: You are nearing your budget limit!';
    }

    return { balance, alert };
  }
}
