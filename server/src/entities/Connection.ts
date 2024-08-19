import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity('connections')
export class Connection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.connectionsAsUser1)
  @JoinColumn({ name: 'user1Id' })
  user1: User;

  @ManyToOne(() => User, (user) => user.connectionsAsUser2)
  @JoinColumn({ name: 'user2Id' })
  user2: User;

  @Column()
  user1Skill: string;

  @Column()
  user2Skill: string;

  @Column('int')
  user1TeachingDuration: number;

  @Column('int')
  user2TeachingDuration: number;

  @Column()
  user1Availability: string;

  @Column()
  user2Availability: string;

  @CreateDateColumn()
  created_at: Date;
}
