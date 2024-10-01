import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User'; // Importa a entidade User

@Entity('emotions')
export class Emotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.emotions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  emotion: string; // O estado emocional (ex: 'feliz', 'triste')

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Data e hora do registro
}
