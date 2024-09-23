import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Task } from './Task';

@Entity('commitments')
export class Commitment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  necessity: number;

  @Column()
  value: number;

  @ManyToOne(() => User, (user) => user.commitments)
  user: User;

  @OneToMany(() => Task, (task) => task.commitment)
  tasks: Task[];
}
