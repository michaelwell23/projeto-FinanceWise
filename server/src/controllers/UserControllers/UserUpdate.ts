import { Request, Response } from 'express';
import { UserUpdateServices } from '../../services/UserServices/UpdateUser';

export class UserUpdateController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, cpf, phone, oldPassword, newPassword } = request.body;

    const avatar = request.file?.filename;

    const updateUserService = new UserUpdateServices();

    try {
      const user = await updateUserService.updateUser({
        id,
        name,
        email,
        cpf,
        phone,
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
      return response.status(400).json({ error: error.message });
    }
  }
}
