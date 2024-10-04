import { Request, Response } from 'express';
import { EmotionCreateService } from '../../services/EmotionServices/CreateEmotionServices';

export class EmotionCreateController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const emotionCreateService = new EmotionCreateService();

      const userId = request.user?.id;

      if (!userId) {
        return response
          .status(400)
          .json({ message: 'Usuário não autenticado' });
      }

      const { emotion } = request.body;

      if (!emotion) {
        return response.status(400).json({ message: 'Emoção não fornecida' });
      }

      const newEmotion = await emotionCreateService.createEmotion(
        userId,
        emotion
      );

      return response
        .status(201)
        .json({ message: 'Emoção criada com sucesso', emotion: newEmotion });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao criar emoção' });
    }
  }
}
