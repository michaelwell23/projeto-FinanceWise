// services/User/UserDeleteService.ts
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../repositories/UserRepository';
import { AppError } from '../../errors/AppError';

export class UserDeleteService {
  async deleteUser(userId: string) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await userRepository.remove(user);
  }
}
