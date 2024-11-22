import { Request, Response } from 'express';
import { AuthService } from '../../services/Auth/UserAuthService';

export class AuthController {
  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authService = new AuthService();

    try {
      const { user, token } = await authService.authenticateUser({
        email,
        password,
      });

      return response.status(200).json({ user, token });
    } catch (error) {
      return response.status(401).json({
        error: error instanceof Error ? error.message : 'Authentication failed',
      });
    }
  }

  async logout(request: Request, response: Response): Promise<Response> {
    return response.status(200).json({ message: 'Logout successful' });
  }
}
