import { getCustomRepository } from 'typeorm';
import { ExpenseRepository } from '../../repositories/ExpenseRepository';

export class ExpenseDeleteService {
  async execute(id: string) {
    const expenseRepository = getCustomRepository(ExpenseRepository);

    const expense = await expenseRepository.findOne(id);
    if (!expense) {
      throw new Error('Expense not found');
    }

    await expenseRepository.remove(expense);
  }
}
