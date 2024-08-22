import { UsersService } from './../services/UserService';
import { Request, Response, request, response } from 'express';
import { generateToken } from '../config/auth';

export class UsersController {
  async createUsers(request: Request, response: Response): Promise<Response> {
    const {
      fullName,
      email,
      password,
      teachingSkills,
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
        teachingSkills,
        experience,
        location,
        avatar,
      });

      const avatarUrl = avatar
        ? `http://localhost:3333/uploads/${avatar}`
        : null;

      const token = generateToken(user.id);

      return response.status(201).json({
        user: {
          fullName,
          email,
          description,
          teachingSkills,
          experience,
          location,
          avatar: avatarUrl,
        },
        token,
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
      const file = request.file;

      const usersService = new UsersService();

      const updatedUser = await usersService.updateUser(id, userData, file);

      if (updatedUser) {
        return response.json(updatedUser);
      } else {
        return response.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      if (
        error.message === 'Password is invalid ' ||
        error.message === 'Current password is required to change password' ||
        error.message === 'Old password is required to update password.'
      ) {
        return response.status(401).json({ error: error.message });
      }
      return response.status(500).json({ error: 'Error updating user' });
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
