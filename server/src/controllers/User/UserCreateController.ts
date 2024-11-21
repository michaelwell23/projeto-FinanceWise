import * as Yup from 'yup';
import { Request, Response } from 'express';
import { UserCreateServices } from '../../services/User/UserCreateService';
import { AppError } from '../../errors/AppError';

export class UserCreateController {
  async create(request: Request, response: Response): Promise<void> {
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
        ? `http://localhost:3333/uploads/${avatar}`
        : null;

      const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: avatar_url,
        token,
      };

      response.status(201).json(userResponse);
    } catch (error: unknown) {
      if (error instanceof Yup.ValidationError) {
        response.status(400).json({ errors: error.errors });
        return;
      }
      if (error instanceof AppError) {
        response.status(error.statusCode).json({ error: error.message });
        return;
      }

      response.status(500).json({
        error: 'Unexpected error occurred',
      });
    }
  }
}
