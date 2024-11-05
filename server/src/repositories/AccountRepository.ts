import { Account } from './../entities/Account';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {}
