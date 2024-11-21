import { Request, Response } from 'express';
import { UserDeleteService } from '../../services/User/UserDeleteService';

export class UserDeleteController {
  async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    const userDeleteService = new UserDeleteService();

    try {
      await userDeleteService.deleteUser(id);
      response.status(204).json({ message: 'Usuário excluido com sucesso!' });
    } catch (error: unknown) {
      response.status(500).json({
        error:
          error instanceof Error ? error.message : 'Unexpected error occurred',
      });
    }
  }
}
