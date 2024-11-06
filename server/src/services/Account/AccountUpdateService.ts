import { getCustomRepository } from 'typeorm';
import { AccountRepository } from '../../repositories/AccountRepository';

interface IAccountUpdateRequest {
  id: string;
  name?: string;
  amount?: number;
  dueDate?: Date;
  category?: string;
}

export class AccountUpdateService {
  public async updateAccount({
    id,
    name,
    amount,
    dueDate,
    category,
  }: IAccountUpdateRequest) {
    const accountRepository = getCustomRepository(AccountRepository);

    const account = await accountRepository.findOne(id);
    if (!account) {
      throw new Error('Account not found');
    }

    account.name = name || account.name;
    account.amount = amount !== undefined ? amount : account.amount;
    account.dueDate = dueDate || account.dueDate;
    account.category = category || account.category;

    await accountRepository.save(account);
    return account;
  }

  public async deleteAccount(id: string) {
    const accountRepository = getCustomRepository(AccountRepository);

    const account = await accountRepository.findOne(id);
    if (!account) {
      throw new Error('Account not found');
    }

    await accountRepository.remove(account);
  }

  public async listAccounts(userId: string) {
    const accountRepository = getCustomRepository(AccountRepository);

    const accounts = await accountRepository.find({
      where: { userId },
      order: { dueDate: 'ASC' },
    });

    return accounts;
  }
}
