import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../repositories/UsersRepository';

export class UserDeleteServices {
  public async deleteUser(id: string): Promise<boolean> {
    const userRepository = getCustomRepository(UserRepository);

    // Procura o usuário
    const user = await userRepository.findOne(id);

    // Se o usuário não existir, retorna false
    if (!user) {
      return false;
    }

    // Se o usuário existir, remove
    await userRepository.remove(user);

    // Retorna true após a remoção
    return true;
  }
}
