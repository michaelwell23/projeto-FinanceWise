import { UsersService } from './../services/UserService';
import { Request, Response, request, response } from 'express';

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

    const avatar = request.file?.filename;

    const usersService = new UsersService();

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

      return response.status(201).json({
        fullName,
        email,
        password,
        description,
        skills,
        experience,
        location,
        avatar: avatarUrl,
      });
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

  public async upadate(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { id } = request.params;
      const userData = request.body;

      const usersService = new UsersService();

      const updatedUser = await usersService.updateUser(id, userData);

      if (updatedUser) {
        return response.json(updatedUser);
      } else {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      if (
        error.message === 'Senha atual inválida' ||
        error.message === 'Senha atual é obrigatória para trocar a senha'
      ) {
        return response.status(401).json({ error: error.message });
      }
      return response.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const usersService = new UsersService();

      const userDeleted = await usersService.deleteUser(id);

      if (userDeleted) {
        return response
          .status(200)
          .json({ message: 'User deleted successfully' });
      }
    } catch (err) {
      return response.status(500).json({ error: 'Error deleting user' });
    }
  }
}
