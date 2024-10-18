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

    const suggestionResponse = await this.getSuggestionFromAI(emotion.emotion);

    const suggestion = suggestionRepository.create({
      description: suggestionResponse,
      emotion,
    });

    await suggestionRepository.save(suggestion);

    return suggestion;
  }

  private async getSuggestionFromAI(emotionText: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt: `Baseado no seguinte sentimento: "${emotionText}", forneça uma sugestão de autocuidado.`,
          max_tokens: 100,
        },
        {
          headers: {
            Authorization: `Bearer SUA_CHAVE_DE_API`,
            'Content-Type': 'application/json',
          },
        }
      );

      return (
        response.data.choices[0].text.trim() ||
        'Não foi possível gerar uma sugestão'
      );
    } catch (error) {
      throw new Error('Erro ao gerar sugestão via API de IA');
    }
  }
}

export default new SuggestionService();
