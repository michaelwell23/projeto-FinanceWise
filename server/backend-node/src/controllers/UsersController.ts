import { Request, Response } from 'express';
import { UsersService } from '../services/UserService';

export class UsersController {
  async createUsers(request: Request, response: Response): Promise<Response> {
    const {
      fullName,
      email,
      password,
      skills,
      experience,
      description,
      location,
    } = request.body;

    const usersService = new UsersService();

    const avatar = request.file?.filename;

    try {
      const user = await usersService.createUser({
        fullName,
        email,
        password,
        description,
        skills,
        experience,
        location,
        avatar,
      });

      const avatarUrl = avatar
        ? `http://localhost:3333/uploads/${avatar}`
        : null;

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async getAllUsers(request: Request, response: Response): Promise<Response> {
    try {
      const usersService = new UsersService();

      const user = await usersService.getAllUsers();
      return response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao obter usuários' });
    }
  }

  async getUserById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const usersService = new UsersService();

      const user = await usersService.getUserById(id);
      if (user) {
        return response.json(user);
      } else {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao obter usuário' });
    }
  }
}
