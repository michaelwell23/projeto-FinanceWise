import { getCustomRepository } from 'typeorm';

import { EmotionRepository } from './../../repositories/EmotionRepository';
import { User } from '../../entities/User';

class CreateEmotionService {
  private emotionRepository = getCustomRepository(EmotionRepository);

  public async createEmotion() {}
}
