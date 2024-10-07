import { EmotionRepository } from './../../repositories/EmotionRepository';
import { UserRepository } from '../../repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';

export class GetByIdEmotionsServices {
  public async getEmotionById(userId: string, emotionId: string) {
    const userRepository = getCustomRepository(UserRepository);
    const emotionRepository = getCustomRepository(EmotionRepository);

    const user = await userRepository.findOne(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const emotion = await emotionRepository.findOne({
      where: { id: emotionId, userId },
    });
    if (!emotion) {
      throw new Error('Emoção não encontrada para este usuário');
    }

    return emotion;
  }
}
