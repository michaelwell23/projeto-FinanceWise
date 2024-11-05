import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  amount: number;

  @Column('date')
  dueDate: Date;

  @Column()
  category: string;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
