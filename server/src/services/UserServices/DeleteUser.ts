import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../repositories/UsersRepository';

export class UserDeleteServices {
  public async deleteUser(id: string): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new Error('User not found!');
    }

    await userRepository.remove(user);
  }
}
