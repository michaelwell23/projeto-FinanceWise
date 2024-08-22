import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Connection } from './Connection';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  description: string;

  @Column('text', { array: true, nullable: true })
  teachingSkills: string[];

  @Column({ nullable: true })
  experience: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => Connection, (connection) => connection.user1)
  connectionsAsUser1: Connection[];

  @OneToMany(() => Connection, (connection) => connection.user2)
  connectionsAsUser2: Connection[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  notifications: any;
}
