import { Request, Response } from 'express';
import { EmotionDeleteServives } from '../../services/EmotionServices/DeleteEmotionServices';

export class EmotionDeleteControler {
  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const emotionDeleteServives = new EmotionDeleteServives();

      const { userId, emotionId } = req.params;
      const result = await emotionDeleteServives.deleteEmotion(
        userId,
        emotionId
      );
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro desconhecido' });
    }
  }
}
