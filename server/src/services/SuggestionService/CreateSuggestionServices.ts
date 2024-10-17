import axios from 'axios';
import { getCustomRepository } from 'typeorm';

import { EmotionRepository } from '../../repositories/EmotionRepository';
import { SuggestionRepository } from '../../repositories/SuggestionRepository';

import { User } from '../../entities/User';
import { Emotion } from '../../entities/Emotion';

class SuggestionService {
  public async generateSuggestionForEmotion(userId: string, emotionId: string) {
    const emotionRepository = getCustomRepository(EmotionRepository);
    const suggestionRepository = getCustomRepository(SuggestionRepository);

    const emotion = await emotionRepository.findOne({
      where: { id: emotionId, user: { id: userId } },
    });

    if (!emotion) {
      throw new Error('Emoção não encontrada ou não pertence ao usuário');
    }

    // Aqui vamos fazer a chamada para uma API de IA para gerar a sugestão
    const suggestionResponse = await this.getSuggestionFromAI(emotion.emotion);

    // Criação da sugestão
    const suggestion = suggestionRepository.create({
      description: suggestionResponse,
      emotion,
    });

    await suggestionRepository.save(suggestion);

    return suggestion;
  }

  private async getSuggestionFromAI(emotionText: string): Promise<string> {
    try {
      const response = await axios.post('URL_DA_API_DE_IA', {
        prompt: `Baseado no seguinte sentimento: "${emotionText}", forneça uma sugestão de autocuidado.`,
        // Outros parâmetros que sua API de IA pode exigir
      });

      return response.data.suggestion || 'Não foi possível gerar uma sugestão';
    } catch (error) {
      throw new Error('Erro ao gerar sugestão via API de IA');
    }
  }
}

export default new SuggestionService();
