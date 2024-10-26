import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

class UserController {
  async register(request: Request, response: Response): Promise<Response> {
    const { name, email, password, avatar } = request.body;

    const userService = new UserService();
    try {
      const user = await userService.createUser({
        name,
        email,
        password,
        avatar,
      });

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { UserController };
