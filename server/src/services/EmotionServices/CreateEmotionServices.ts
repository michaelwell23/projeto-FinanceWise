import { getCustomRepository } from 'typeorm';
import { EmotionRepository } from '../../repositories/EmotionRepository';
import { Emotion } from '../../entities/Emotion';

interface IEmotion {
  userId: string;
  emotion: string;
}

export class EmotionCreateService {
  public async createEmotion({ userId, emotion }: IEmotion): Promise<Emotion> {
    const emotionRepository = getCustomRepository(EmotionRepository);

    if (!userId || !emotion) {
      throw new Error('ID de usuário e emoção são obrigatórios');
    }

    const newEmotion = new Emotion();
    newEmotion.userId = userId;
    newEmotion.emotion = emotion;

    return await emotionRepository.save(newEmotion);
  }
}
