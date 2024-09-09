import { Request, Response } from 'express';
import { UserGetOne } from '../../services/UserServices/GetOneUser';

export class UserGetOneController {
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getUserService = new UserGetOne();

    try {
      const user = await getUserService.getOneUser(id);

      if (!user) {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }

      const { name, cpf, email, avatar, created_at, updated_at } = user;

      const avaterUrl = avatar
        ? `${request.protocol}://${request.get('host')}/uploads/${user.avatar}`
        : null;

      const userResponse = {
        id,
        name,
        cpf,
        email,
        avatar: avaterUrl,
        created_at,
        updated_at,
      };

      return response.json(userResponse);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}