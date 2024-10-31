import { Request, Response } from 'express';
import { UserUpdateService } from '../../services/User/UserUpdateService';

export class UserUpdateController {
  private userUpdateService: UserUpdateService;

  constructor() {
    this.userUpdateService = new UserUpdateService();
    this.update = this.update.bind(this);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password, oldPassword } = request.body;
    const avatar = request.file ? request.file.filename : undefined;

    try {
      const updatedUser = await this.userUpdateService.updateUser({
        id,
        name,
        email,
        password,
        oldPassword,
        avatar,
      });

      return response.status(200).json(updatedUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return response.status(400).json({
          error: error.message,
        });
      }
      return response.status(500).json({
        error: 'Unexpected error occurred',
      });
    }
  }
}
