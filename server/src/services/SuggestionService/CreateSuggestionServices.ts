import { getCustomRepository } from 'typeorm';
import OpenAI from 'openai';
import 'dotenv/config';

import { EmotionRepository } from '../../repositories/EmotionRepository';
import { SuggestionRepository } from '../../repositories/SuggestionRepository';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class SuggestionCreateService {
  public async create(userId: string, emotionId: string): Promise<any> {
    const emotionRepository = getCustomRepository(EmotionRepository);
    const suggestionRepository = getCustomRepository(SuggestionRepository);

    const emotion = await emotionRepository.findOne({
      where: { id: emotionId, user: { id: userId } },
    });

    if (!emotion) {
      throw new Error('Emoção não encontrada ou não pertence ao usuário');
    }

    const response = await this.generateSuggestion(emotion.emotion);

    const newSuggestion = suggestionRepository.create({
      description: response,
      emotion,
    });

    await suggestionRepository.save(newSuggestion);

    return {
      message: 'Sugestão criada com sucesso',
      suggestion: newSuggestion,
    };
  }

  private async generateSuggestion(userEmotion: string): Promise<string> {
    const prompt = `O usuário está se sentindo da seguinte maneira: "${userEmotion}". Por favor, sugira uma técnica de autocuidado ou uma resposta apropriada para ajudá-lo.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'Você é um assistente que sugere autocuidados com base em emoções.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return completion.choices[0].message.content.trim();
  }
}
