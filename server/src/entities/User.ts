import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Emotion } from './Emotion';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  cpf!: string;

  @Column()
  phone!: string;

  @Column({ nullable: true })
  avatar?: string;

  @OneToMany(() => Emotion, (emotion) => emotion.user)
  emotions: Emotion[] | undefined;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
