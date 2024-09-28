import { Request, Response } from 'express';
import { UserGetAllServices } from '../../services/UserServices/GetAllUser';

export class UserGetAllController {
  async list(request: Request, response: Response): Promise<Response> {
    const listUsersService = new UserGetAllServices();

    try {
      const users = await listUsersService.getAllUser();

      if (users.length === 0) {
        return response.status(404).json({ message: 'No users found' });
      }

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

      return response.status(200).json(usersWithAvatar);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message });
      }

      return response.status(500).json({ error: 'Unexpected error occurred' });
    }
  }
}
