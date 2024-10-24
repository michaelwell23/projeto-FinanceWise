import { getCustomRepository } from 'typeorm';
import { SuggestionRepository } from '../../repositories/SuggestionRepository';
import { EmotionRepository } from '../../repositories/EmotionRepository';
// Aqui você pode importar sua biblioteca de IA

export class SuggestionCreateService {
  public async create(userId: string, emotionId: string) {
    const suggestionRepository = getCustomRepository(SuggestionRepository);
    const emotionRepository = getCustomRepository(EmotionRepository);

    const emotion = await emotionRepository.findOne(emotionId);
    if (!emotion) {
      throw new Error('Emoção não encontrada');
    }

    const aiResponse = await this.getAiSuggestion(emotion.emotion);

    const newSuggestion = suggestionRepository.create({
      userId,
      emotionId,
      suggestion: aiResponse,
    });

    await suggestionRepository.save(newSuggestion);

    return newSuggestion;
  }

  private async getAiSuggestion(emotion: string): Promise<string> {
    // Aqui vai a lógica para conectar com a API de IA e gerar a sugestão
    // Exemplo fictício:
    const response = await someAiService.generateSuggestion(emotion);
    return response.suggestionText;
  }
}
