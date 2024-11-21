import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  maxAmount?: number;

  @ManyToOne(() => User, (user) => user.budgets)
  user?: User;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
