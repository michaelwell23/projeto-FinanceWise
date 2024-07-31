import { Request, Response } from 'express';
import { UsersService } from '../services/UserService';

export class UsersController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const usersService = new UsersService();

    const user = await usersService.create({ name, email, password });

    return response.status(201).json(user);
  }
}
