import { Request, Response } from 'express';
import { SuggestionCreateService } from '../../services/SuggestionService/CreateSuggestionServices';
import { GetByIdEmotionsServices } from '../../services/EmotionServices/GetByIdEmotionServices';

class SuggestionController {
  public async getSuggestion(req: Request, res: Response): Promise<Response> {
    const suggestionCreateService = new SuggestionCreateService();
    const getByIdEmotionsServices = new GetByIdEmotionsServices();

    try {
      const { emotionId } = req.params;

      const emotion = await getByIdEmotionsServices.getEmotionById(emotionId);

      if (!emotion) {
        return res.status(404).json({ error: 'Emoção não encontrada' });
      }

      const suggestion = await suggestionCreateService.create(emotion);

      return res
        .status(200)
        .json({ message: 'Sugestão gerada com sucesso', suggestion });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao gerar sugestão' });
    }
  }
}

export default new SuggestionController();
