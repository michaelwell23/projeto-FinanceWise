import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import { User } from './User';
import { Suggestion } from './Suggestion';
@Entity('emotions')
export class Emotion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @ManyToOne(() => User, (user) => user.emotions)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @OneToMany(() => Suggestion, (suggestion) => suggestion.emotion)
  suggestions!: Suggestion[];

  @Column()
  emotion!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
