import { Request, Response } from 'express';
import EmotionService from '../services/emotionService';

class EmotionController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
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

      const newEmotion = await EmotionService.createEmotion(userId, emotion);

      return response
        .status(201)
        .json({ message: 'Emoção criada com sucesso', emotion: newEmotion });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao criar emoção' });
    }
  }
}

export default new EmotionController();
