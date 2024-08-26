import { Request, Response } from 'express';
import { UserServices } from '../services/UsersService';

export class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, cpf, phone } = request.body;

    const userServices = new UserServices();

    try {
      const user = await userServices.createUser({
        name,
        email,
        password,
        cpf,
        phone,
      });

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
