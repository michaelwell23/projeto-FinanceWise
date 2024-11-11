import { Budget } from './../entities/Budget';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Budget)
export class BudgetRepository extends Repository<Budget> {}
