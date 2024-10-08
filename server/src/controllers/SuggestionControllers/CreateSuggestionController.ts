import { Request, Response } from 'express';
import SuggestionCreateService from '../../services/SuggestionService/CreateSuggestionServices';
import EmotionService from '../../services/EmotionServices/GetByIdEmotionServices';

class SuggestionController {
  public async getSuggestion(req: Request, res: Response): Promise<Response> {
    try {
      const { emotionId } = req.params;

      const emotion = await EmotionService.getEmotionById(emotionId);

      if (!emotion) {
        return res.status(404).json({ error: 'Emoção não encontrada' });
      }

      const suggestion = await SuggestionService.generateSuggestion(emotion);

      return res
        .status(200)
        .json({ message: 'Sugestão gerada com sucesso', suggestion });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao gerar sugestão' });
    }
  }
}

export default new SuggestionController();
