import { Request, Response } from 'express';
import { SuggestionCreateService } from '../../services/SuggestionService/CreateSuggestionServices';

export class SuggestionCreateController {
  public async getSuggestion(
    request: Request,
    response: Response
  ): Promise<Response> {
    const suggestionCreateService = new SuggestionCreateService();

    try {
      const userId = request.user.id;
      const { emotionId } = request.body;

      const result = await suggestionCreateService.create(userId, emotionId);
      return response.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message });
      }
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
