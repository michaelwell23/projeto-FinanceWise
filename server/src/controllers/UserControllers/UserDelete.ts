import { Request, Response } from 'express';

import { UserDeleteServices } from '../../services/UserServices/DeleteUser';

export class UserDeleteController {
  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserService = new UserDeleteServices();

    try {
      await deleteUserService.deleteUser(id);
      return response
        .status(200)
        .json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
