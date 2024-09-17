import { Request, Response } from 'express';
import { AuthenticateUserService } from '../../services/Authenticate/UserLoginService';

export class AuthenticateUserController {
  async userLoginAuth(request: Request, response: Response): Promise<Response> {
    const { identifier, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    try {
      const { token } = await authenticateUserService.authenticate({
        identifier,
        password,
      });

      return response.status(200).json({ token });
    } catch (error) {
      return response.status(400).json({
        error: error.message || 'Unexpected error occurred',
      });
    }
  }

  async userLogoutAuth() {
    localStorage.removeItem('token');

    fetch('http://localhost:3000/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(() => {
        console.log('Logout realizado com sucesso.');
      })
      .catch((error) => {
        console.error('Erro ao realizar logout:', error);
      });
  }
}
