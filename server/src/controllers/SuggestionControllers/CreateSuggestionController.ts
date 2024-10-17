import { Request, Response } from 'express';
import SuggestionService from '../../services/SuggestionService/CreateSuggestionServices';

class SuggestionController {
  public async generate(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const userId = request.user.id;

      const { emotionId } = request.params;

      const suggestion = await SuggestionService.generateSuggestionForEmotion(
        userId,
        emotionId
      );

      return response.status(201).json(suggestion);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message });
      }
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default new SuggestionController();
