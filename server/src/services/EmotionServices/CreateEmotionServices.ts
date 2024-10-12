import { getCustomRepository } from 'typeorm';
import { EmotionRepository } from '../../repositories/EmotionRepository';
import { UserRepository } from '../../repositories/UsersRepository';
import { SuggestionCreateService } from '../../services/SuggestionService/CreateSuggestionServices';

export class EmotionCreateService {
  public async createEmotion(userId: string, emotion: string) {
    const emotionRepository = getCustomRepository(EmotionRepository);
    const userRepository = getCustomRepository(UserRepository);
    const suggestionCreateService = new SuggestionCreateService();

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

    const suggestion = await suggestionCreateService.create(
      userId,
      newEmotion.id
    );

    return {
      emotion: newEmotion,
    };
  }
}
