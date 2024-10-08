import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class OpenAiService {
  public async analyzeEmotionAndSuggest(emotion: string): Promise<string> {
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

      // Verifique se a resposta existe e se há sugestões disponíveis
      if (response && response.choices && response.choices.length > 0) {
        return (
          response.choices[0].message?.content.trim() ||
          'Nenhuma sugestão disponível no momento.'
        );
      } else {
        return 'Nenhuma sugestão disponível no momento.';
      }
    } catch (error) {
      console.error('Erro ao chamar a API da OpenAI:', error);
      return 'Ocorreu um erro ao gerar a sugestão de autocuidado.';
    }
  }
}

export default new OpenAiService();
