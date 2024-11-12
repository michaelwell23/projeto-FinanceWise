import { EntityRepository, Repository } from 'typeorm';
import { ExpenseEntity } from '../entities/Expense';

@EntityRepository(ExpenseEntity)
export class ExpenseRepository extends Repository<ExpenseEntity> {}
