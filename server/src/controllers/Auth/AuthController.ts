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

      response.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return response.status(200).json({ user });
    } catch (error) {
      return response.status(401).json({
        error: error instanceof Error ? error.message : 'Authentication failed',
      });
    }
  }

  async logout(request: Request, response: Response): Promise<Response> {
    response.clearCookie('authToken');
    return response.status(200).json({ message: 'Logout successful' });
  }
}
