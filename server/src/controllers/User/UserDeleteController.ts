// controllers/User/UserDeleteController.ts
import { Request, Response } from 'express';
import { UserDeleteService } from '../../services/User/UserDeleteService';

export class UserDeleteController {
  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const userDeleteService = new UserDeleteService();

    try {
      await userDeleteService.deleteUser(id);
      return response.status(204).send();
    } catch (error) {
      return response.status(error.statusCode || 500).json({
        error: error.message || 'Unexpected error occurred',
      });
    }
  }
}
