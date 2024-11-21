import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ExpenseEntity } from './Expense'; // Supondo que você tenha a entidade Expense
import { Account } from './Account'; // Nova importação da entidade Account
import { Budget } from './Budget'; // Nova importação da entidade Budget

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  password?: string;

  @Column({ nullable: true })
  avatar?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @OneToMany(() => ExpenseEntity, (expense) => expense.user)
  expenses?: ExpenseEntity[];

  @OneToMany(() => Account, (account) => account.user)
  accounts?: Account[];

  @OneToMany(() => Budget, (budget) => budget.user)
  budgets?: Budget[];
}
