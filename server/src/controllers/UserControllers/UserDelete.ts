import { Request, Response } from 'express';
import { UserDeleteServices } from '../../services/UserServices/DeleteUser';

export class UserDeleteController {
  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserService = new UserDeleteServices();

    try {
      // Chama o serviço para deletar o usuário
      const userDeleted = await deleteUserService.deleteUser(id);

      // Verifica se o retorno do deleteUser é false
      if (userDeleted === false) {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }

      return response
        .status(200)
        .json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      return response.status(400).json({ error: 'Unexpected error occurred' });
    }
  }
}
