import { Request, Response } from 'express';
import { UserGetOne } from '../../services/UserServices/GetOneUser';
import * as Yup from 'yup';

export class UserGetOneController {
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getUserService = new UserGetOne();

    const schema = Yup.object().shape({
      id: Yup.string().uuid('Invalid ID format').required('ID is required'),
    });

    try {
      await schema.validate({ id }, { abortEarly: false });

      const user = await getUserService.getOneUser(id);

      if (!user) {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }

      const { name, cpf, email, avatar, created_at, updated_at } = user;

      const avatarUrl = avatar
        ? `${request.protocol}://${request.get('host')}/uploads/${user.avatar}`
        : null;

      const userResponse = {
        id,
        name,
        cpf,
        email,
        avatar: avatarUrl,
        created_at,
        updated_at,
      };

      return response.status(200).json(userResponse);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return response.status(400).json({
          errors: error.errors,
        });
      }

      if (error instanceof Error) {
        return response.status(400).json({ error: error.message });
      }

      return response.status(500).json({ error: 'Unexpected error occurred' });
    }
  }
}
