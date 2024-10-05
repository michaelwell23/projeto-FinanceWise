import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../repositories/UsersRepository';

import { EmotionRepository } from '../../repositories/EmotionRepository';

export class EmotionDeleteServives {
  public async deleteEmotion(userId: string, emotionId: string) {
    const emotionRepository = getCustomRepository(EmotionRepository);
    const userRepository = getCustomRepository(UserRepository);

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

    await emotionRepository.remove(emotion);
    return { message: 'Emoção deletada com sucesso' };
  }
}
