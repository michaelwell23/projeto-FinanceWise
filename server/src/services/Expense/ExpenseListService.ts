import { getCustomRepository } from 'typeorm';
import { ExpenseRepository } from '../../repositories/ExpenseRepository';

export class ListExpensesService {
  async execute(userId: string) {
    const expenseRepository = getCustomRepository(ExpenseRepository);

    return await expenseRepository.find({ where: { userId } });
  }
}
