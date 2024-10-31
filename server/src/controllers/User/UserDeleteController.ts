// controllers/User/UserDeleteController.ts
import { Request, Response } from 'express';
import { UserDeleteService } from '../../services/User/UserDeleteService';

export class UserDeleteController {
  private userDeleteService: UserDeleteService;

  constructor() {
    this.userDeleteService = new UserDeleteService();
    this.delete = this.delete.bind(this);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      await this.userDeleteService.deleteUser(id);
      return response.status(204).send();
    } catch (error: unknown) {
      return response.status(500).json({
        error:
          error instanceof Error ? error.message : 'Unexpected error occurred',
      });
    }
  }
}
