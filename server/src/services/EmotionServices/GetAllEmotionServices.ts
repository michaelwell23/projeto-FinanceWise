import { getCustomRepository } from 'typeorm';
import { EmotionRepository } from '../../repositories/EmotionRepository';

import { UserRepository } from '../../repositories/UsersRepository';
import { Emotion } from '../../entities/Emotion';

export class EmotionGetServices {
  public async getAllEmotionsByUser(userId: string): Promise<Emotion[]> {
    const emotionRepository = getCustomRepository(EmotionRepository);
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const emotions = await emotionRepository.find({ userId });

    if (emotions.length === 0) {
      throw new Error('Nenhuma emoção encontrada para este usuário');
    }

    return emotions;
  }
}
