import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Emotion } from './Emotion';

@Entity('suggestions')
export class Suggestion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  description!: string;

  @ManyToOne(() => Emotion, (emotion) => emotion.suggestions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'emotionId' })
  emotion!: Emotion;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
