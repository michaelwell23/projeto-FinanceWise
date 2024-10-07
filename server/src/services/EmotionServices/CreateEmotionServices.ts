import { getCustomRepository } from 'typeorm';
import { EmotionRepository } from '../../repositories/EmotionRepository';

import { Emotion } from '../../entities/Emotion';

import { UserRepository } from '../../repositories/UsersRepository';

export class EmotionCreateService {
  public async createEmotion(userId: string, emotion: string) {
    const emotionRepository = getCustomRepository(EmotionRepository);
    const userRepository = getCustomRepository(UserRepository);

    if (!userId || !emotion) {
      throw new Error('ID de usuário e emoção são obrigatórios');
    }

    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const newEmotion = emotionRepository.create({
      userId: user.id,
      emotion,
    });

    await emotionRepository.save(newEmotion);

    return {
      emotion: newEmotion,
    };
  }
}
