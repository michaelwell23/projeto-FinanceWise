import { ExpenseListService } from './../../services/Expense/ExpenseList';
import { Request, Response } from 'express';

export class ExpenseListController {
  private expenseListService: ExpenseListService;

  constructor() {
    this.expenseListService = new ExpenseListService();
    this.list = this.list.bind(this);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const { userId } = request;
    const expenses = await this.expenseListService.listExpenses(userId);

    return response.status(200).json(expenses);
  }
}
