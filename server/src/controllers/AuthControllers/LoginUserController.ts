import { Request, Response } from 'express';
import { AuthenticateUserService } from '../../services/Authenticate/UserLoginService';

export class AuthenticateUserController {
  async userLoginAuth(request: Request, response: Response): Promise<Response> {
    const { emailOrCpf, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    try {
      const { token } = await authenticateUserService.authenticate({
        emailOrCpf,
        password,
      });

      return response.status(200).json({ token });
    } catch (error) {
      return response.status(400).json({
        error: error.message || 'Unexpected error occurred',
      });
    }
  }
}
