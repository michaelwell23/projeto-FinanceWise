import { getCustomRepository, Between } from 'typeorm';
import { AccountRepository } from '../../repositories/AccountRepository';

export class AccountReportService {
  public async getMonthlyReport(userId: string, month: number, year: number) {
    const accountRepository = getCustomRepository(AccountRepository);

    const expenses = await accountRepository.find({
      where: {
        user: { id: userId },
        dueDate: Between(
          new Date(year, month - 1, 1),
          new Date(year, month, 0)
        ),
      },
    });

    const totalExpense = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );

    const expensesByCategory = expenses.reduce((acc, expense) => {
      const category = expense.category || 'Other';
      acc[category] = (acc[category] || 0) + Number(expense.amount);
      return acc;
    }, {} as Record<string, number>);

    return {
      totalExpense,
      expensesByCategory,
    };
  }
}
