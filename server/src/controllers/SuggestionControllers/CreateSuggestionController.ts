export class EmotionCreateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const emotionCreateService = new EmotionCreateService();

    try {
      const userId = request.user.id;
      const { emotion } = request.body;

      if (!userId || !emotion) {
        return response
          .status(400)
          .json({ message: 'ID de usuário e emoção são obrigatórios' });
      }

      const result = await emotionCreateService.createEmotion(userId, emotion);

      return response.status(201).json({
        emotion: result.emotion,
        suggestion: result.suggestion, // Inclui a sugestão gerada
      });
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Erro ao criar emoção', error: error.message });
    }
  }
}
