import { getCustomRepository } from 'typeorm';
import { AccountRepository } from '../../repositories/AccountRepository';
import { Account } from '../../entities/Account';

export class AccountGetService {
  public async getAllAccounts(userId: string): Promise<Account[]> {
    const accountRepository = getCustomRepository(AccountRepository);

    const accounts = await accountRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!accounts.length) {
      throw new Error('No accounts found for this user');
    }

    return accounts;
  }

  public async getOneAccount(
    id: string,
    userId: string
  ): Promise<Account | undefined> {
    const accountRepository = getCustomRepository(AccountRepository);

    const account = await accountRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'],
    });

    if (!account) {
      throw new Error('Account not found');
    }

    return account;
  }
}
