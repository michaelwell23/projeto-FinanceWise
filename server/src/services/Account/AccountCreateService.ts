// src/services/Account/AccountService.ts
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { AccountRepository } from '../../repositories/AccountRepository';
import { UserRepository } from '../../repositories/UserRepository';

interface IAccountRequest {
  userId: string;
  name: string;
  amount: number;
  dueDate: Date;
  category: string;
}

export class AccountCreateService {
  public async createAccount({
    userId,
    name,
    amount,
    dueDate,
    category,
  }: IAccountRequest) {
    const accountRepository = getCustomRepository(AccountRepository);
    const userRepository = getCustomRepository(UserRepository);

    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      amount: Yup.number()
        .required('Amount is required')
        .positive('Amount must be positive'),
      dueDate: Yup.date().required('Due date is required'),
      category: Yup.string().required('Category is required'),
    });

    await schema.validate(
      { name, amount, dueDate, category },
      { abortEarly: false }
    );

    const user = await userRepository.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const account = accountRepository.create({
      name,
      amount,
      dueDate,
      category,
      user,
    });

    await accountRepository.save(account);
    return account;
  }
}
