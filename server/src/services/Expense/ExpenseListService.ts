import { getCustomRepository } from 'typeorm';
import { ExpenseRepository } from '../../repositories/ExpenseRepository';

export class ExpensesListService {
  async execute(userId: string) {
    const expenseRepository = getCustomRepository(ExpenseRepository);

    return await expenseRepository.find({ where: { userId } });
  }
}
