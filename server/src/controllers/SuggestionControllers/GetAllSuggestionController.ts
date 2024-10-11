import { Request, Response } from 'express';
import { SuggestionGetAllService } from '../../services/SuggestionService/GetAllSuggestionServices';

export class SuggestionGetAllController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const suggestionGetAllService = new SuggestionGetAllService();

    try {
      const userId = request.user.id;
      const suggestions = await suggestionGetAllService.getAllSuggestions(
        userId
      );
      return response.status(200).json(suggestions);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message });
      }
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
