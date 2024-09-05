import { Request, Response } from 'express';
import { UserGetAllServices } from '../../services/UserServices/GetAllUser';

export class UserGetAllController {
  async list(request: Request, response: Response): Promise<Response> {
    const listUsersService = new UserGetAllServices();

    try {
      const users = await listUsersService.getAllUser();

      const usersWithAvatar = users.map((user) => {
        const { id, name, cpf, email, avatar, created_at, updated_at } = user;

        return {
          id,
          name,
          cpf,
          email,
          avatar: avatar
            ? `${request.protocol}://${request.get('host')}/uploads/${avatar}`
            : null,
          created_at,
          updated_at,
        };
      });

      return response.json(usersWithAvatar);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
