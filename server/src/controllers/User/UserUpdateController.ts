import * as Yup from 'yup';
import { Request, Response } from 'express';
import { UserUpdateService } from '../../services/User/UserUpdateService';

export class UserUpdateController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, oldPassword, newPassword } = request.body;

    const avatar = request.file?.filename;

    const updateUserService = new UserUpdateService();

    try {
      const user = await updateUserService.updateUser({
        id,
        name,
        email,
        oldPassword,
        newPassword,
        avatar,
      });

      const userResponse = {
        ...user,
        avatar_url: `${request.protocol}://${request.get('host')}/uploads/${
          user.avatar
        }`,
      };

      return response.json(userResponse);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return response.status(400).json({
          errors: error.errors,
        });
      }

      return response.status(500).json({
        error:
          error instanceof Error ? error.message : 'Unexpected error occurred',
      });
    }
  }
}
