import { getCustomRepository } from 'typeorm';
import { ExpenseRepository } from '../../repositories/ExpenseRepository';

interface IUpdateExpenseRequest {
  id: string;
  name?: string;
  amount?: number;
  dueDate?: string;
  category?: string;
}

export class ExpenseUpdateService {
  async execute({
    id,
    name,
    amount,
    dueDate,
    category,
  }: IUpdateExpenseRequest) {
    const expenseRepository = getCustomRepository(ExpenseRepository);

    const expense = await expenseRepository.findOne(id);
    if (!expense) {
      throw new Error('Expense not found');
    }

    if (name) expense.name = name;
    if (amount) expense.amount = amount;
    if (dueDate) expense.dueDate = dueDate;
    if (category) expense.category = category;

    await expenseRepository.save(expense);

    return expense;
  }
}
