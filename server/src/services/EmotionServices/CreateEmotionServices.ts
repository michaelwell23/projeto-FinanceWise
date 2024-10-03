import { getCustomRepository } from 'typeorm';
import { EmotionRepository } from '../../repositories/EmotionRepository';
import { Emotion } from '../../entities/Emotion';

export class EmotionService {
  private emotionRepository = getCustomRepository(EmotionRepository);

  public async createEmotion(
    userId: string,
    emotion: string
  ): Promise<Emotion> {
    if (!userId || !emotion) {
      throw new Error('ID de usuário e emoção são obrigatórios');
    }

    const newEmotion = new Emotion();
    newEmotion.userId = userId;
    newEmotion.emotion = emotion;

    return await this.emotionRepository.save(newEmotion);
  }
}
