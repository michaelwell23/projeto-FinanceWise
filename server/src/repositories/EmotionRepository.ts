import { Emotion } from './../entities/Emotion';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Emotion)
export class EmotionRepository extends Repository<Emotion> {}
