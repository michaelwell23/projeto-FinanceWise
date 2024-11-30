import { EntityRepository, Repository } from 'typeorm';
import { Budget } from '../entities/Budget';

@EntityRepository(Budget)
export class BudgetRepository extends Repository<Budget> {}
