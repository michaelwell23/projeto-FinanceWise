import * as Yup from 'yup';
import { classToPlain } from 'class-transformer';
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
        name,
        email,
        cpf,
        phone,
        avatar: avatar_url,
      };

      return response.status(201).json(userResponse);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return response.status(400).json({
          errors: error.errors,
        });
      }

      return response.status(400).json({
        error: error.message || 'Unexpected error occurred',
      });
    }
  }
}
