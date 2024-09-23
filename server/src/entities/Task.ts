import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Commitment } from './Commitment';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  urgency: number;

  @Column()
  importance: number;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @ManyToOne(() => Commitment, (commitment) => commitment.tasks, {
    nullable: true,
  })
  commitment: Commitment | null;
}
