import { Request, Response } from 'express';
import { UserUpdateService } from '../../services/User/UserUpdateService';

export class UserUpdateController {
  async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const { name, email, password, oldPassword } = request.body;
    const avatar = request.file ? request.file.filename : undefined;

    const userUpdateService = new UserUpdateService();

    try {
      const updatedUser = await userUpdateService.updateUser({
        id,
        name,
        email,
        password,
        oldPassword,
        avatar,
      });

      response.status(200).json(updatedUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        response.status(400).json({
          error: error.message,
        });
        return;
      }

      response.status(500).json({
        error: 'Unexpected error occurred',
      });
    }
  }
}
