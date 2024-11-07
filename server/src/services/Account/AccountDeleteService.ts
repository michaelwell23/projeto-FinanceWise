import { getCustomRepository } from 'typeorm';
import { AccountRepository } from '../../repositories/AccountRepository';

export class AccountDeleteService {
  public async deleteAccount(id: string): Promise<void> {
    const accountRepository = getCustomRepository(AccountRepository);

    const account = await accountRepository.findOne(id);

    if (!account) {
      throw new Error('Account not found');
    }

    await accountRepository.remove(account);
  }
}
