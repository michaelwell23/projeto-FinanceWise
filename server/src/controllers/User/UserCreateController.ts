import * as Yup from 'yup';
import { Request, Response } from 'express';
import { UserCreateServices } from '../../services/User/UserCreateService';
import { AppError } from '../../errors/AppError';

export class UserCreateController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const avatar = request.file ? request.file.filename : undefined;

    const userServices = new UserCreateServices();

    try {
      const { user, token } = await userServices.createUser({
        name,
        email,
        password,
      });

      const avatar_url = avatar
        ? `${request.protocol}://${request.get('host')}/uploads/${avatar}`
        : null;

      const userResponse = {
        name: user.name,
        email: user.email,
        avatar: avatar_url,
        token,
      };

      return response.status(201).json(userResponse);
    } catch (error: unknown) {
      if (error instanceof Yup.ValidationError) {
        return response.status(400).json({ errors: error.errors });
      }
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      }

      return response.status(500).json({
        error: 'Unexpected error occurred',
      });
    }
  }
}
