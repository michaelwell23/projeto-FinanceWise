import { Request, Response } from 'express';
import { EmotionGetServices } from '../../services/EmotionServices/GetAllEmotionServices';

export class EmotionGetAllController {
  public async getEmotionsByUser(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const emotionService = new EmotionGetServices();

      const { userId } = req.params;

      const emotions = await emotionService.getAllEmotionsByUser(userId);

      return res.status(200).json(emotions);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro desconhecido' });
    }
  }
}
