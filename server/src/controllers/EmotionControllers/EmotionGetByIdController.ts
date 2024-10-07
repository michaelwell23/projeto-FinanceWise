import { GetByIdEmotionsServices } from './../../services/EmotionServices/GetByIdEmotionServices';
import { Request, Response } from 'express';

export class EmotionGetByIdController {
  public async getEmotionById(req: Request, res: Response): Promise<Response> {
    const getByIdEmotionsServices = new GetByIdEmotionsServices();

    try {
      const { userId, emotionId } = req.params;
      const emotion = await getByIdEmotionsServices.getEmotionById(
        userId,
        emotionId
      );
      return res.status(200).json(emotion);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro desconhecido' });
    }
  }
}
