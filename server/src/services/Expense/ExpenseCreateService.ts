import { getCustomRepository } from 'typeorm';
import { ExpenseRepository } from '../../repositories/ExpenseRepository';

interface IExpenseRequest {
  userId: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
}

export class CreateExpenseService {
  async execute({ userId, name, amount, dueDate, category }: IExpenseRequest) {
    const expenseRepository = getCustomRepository(ExpenseRepository);

    const expense = expenseRepository.create({
      userId,
      name,
      amount,
      dueDate,
      category,
    });

    await expenseRepository.save(expense);

    return expense;
  }
}
