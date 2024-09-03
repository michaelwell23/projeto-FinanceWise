import { Request, Response } from 'express';
import { UserCreateServices } from '../../services/UserServices/CreateUser';

export class UserCreateController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, cpf, phone } = request.body;
    const avatar = request.file ? request.file.filename : undefined;

    const userServices = new UserCreateServices();

    try {
      const user = await userServices.createUser({
        name,
        email,
        password,
        cpf,
        phone,
      });

      const avatar_url = avatar
        ? `${request.protocol}://${request.get('host')}/uploads/${avatar}`
        : null;

      const userResponse = {
        ...user,
        avatar_url,
      };

      return response.status(201).json(userResponse);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
