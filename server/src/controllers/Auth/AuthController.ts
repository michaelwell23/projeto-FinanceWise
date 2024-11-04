import { Request, Response } from 'express';
import { AuthService } from '../../services/Auth/UserAuthService';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const { user, token } = await this.authService.authenticateUser({
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
}
