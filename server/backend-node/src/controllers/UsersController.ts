import { Request, Response } from 'express';
import { UsersService } from '../services/UserService';

export class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
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

    try {
      const user = await usersService.createUser({
        fullName,
        email,
        password,
        description,
        skills,
        experience,
        location,
      });

      return response.status(201).json({
        name: user.fullName,
        email: user.email,
        description: user.description,
        skills: user.skills,
        experience: user.experience,
        location: user.location,
      });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
