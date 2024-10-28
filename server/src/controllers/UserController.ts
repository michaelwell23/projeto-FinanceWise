import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  async register(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const userService = new UserService();

    try {
      const user = await userService.register({ name, email, password });
      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const userService = new UserService();

    try {
      const token = await userService.authenticate(email, password);
      return response.json({ token });
    } catch (error) {
      return response.status(401).json({ error: error.message });
    }
  }
}
