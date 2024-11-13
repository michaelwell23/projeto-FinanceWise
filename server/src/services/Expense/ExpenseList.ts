import { getCustomRepository } from 'typeorm';
import { ExpenseRepository } from '../../repositories/ExpenseRepository';

export class ExpenseListService {
  public async listExpenses(userId: string) {
    const expenseRepository = getCustomRepository(ExpenseRepository);
    return await expenseRepository.findOne(userId);
  }
}
