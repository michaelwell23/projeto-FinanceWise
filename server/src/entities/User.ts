import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Account } from './Account';
import { Budget } from './Budget';

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

  @OneToMany(() => Account, (account) => account.user)
  accounts?: Account[];

  @OneToMany(() => Budget, (budget) => budget.user)
  budgets?: Budget[];
}
