import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

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
}
