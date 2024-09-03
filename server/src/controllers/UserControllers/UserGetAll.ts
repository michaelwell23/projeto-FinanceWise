import { Request, Response } from 'express';
import { UserGetAllServices } from '../../services/UserServices/GetAllUser';

export class UserGetAllController {
  async list(request: Request, response: Response): Promise<Response> {
    const listUsersService = new UserGetAllServices();

    try {
      const users = await listUsersService.getAllUser();

      const usersWithAvatar = users.map((user) => ({
        ...user,
        avatar_url: user.avatar
          ? `${request.protocol}://${request.get('host')}/uploads/${
              user.avatar
            }`
          : null,
      }));

      return response.json(usersWithAvatar);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
