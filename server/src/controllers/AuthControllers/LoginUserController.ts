import { Request, Response } from 'express';
import { AuthenticateUserService } from '../../services/Authenticate/UserLoginService';

export class AuthenticateUserController {
  async userLoginAuth(request: Request, response: Response): Promise<Response> {
    const { identifier, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    try {
      const { token, user } = await authenticateUserService.authenticate({
        identifier,
        password,
      });

      return response.status(200).json({ user, token });
    } catch (error) {
      return response.status(400).json({
        error: 'An error occurred during authentication',
      });
    }
  }
}
