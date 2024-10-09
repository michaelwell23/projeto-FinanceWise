import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class SuggestionCreateService {
  public async create(emotion: string): Promise<string> {
    try {
      const prompt = `O usuário está sentindo: ${emotion}. Responda com uma sugestão de autocuidado apropriada.`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Você é um assistente de saúde mental.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 150,
        temperature: 0.7,
      });

      if (response && response.choices && response.choices.length > 0) {
        const message = response.choices[0].message;
        if (message && message.content) {
          return message.content.trim();
        }
      }

      return 'Nenhuma sugestão disponível no momento.';
    } catch (error) {
      console.error('Erro ao chamar a API da OpenAI:', error);
      return 'Ocorreu um erro ao gerar a sugestão de autocuidado.';
    }
  }
}
