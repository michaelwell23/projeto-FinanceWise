// services/User/UserUpdateService.ts
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../repositories/UserRepository';
import { AppError } from '../../errors/AppError';

interface IUserUpdateRequest {
  userId: string;
  name?: string;
  email?: string;
}

export class UserUpdateService {
  async updateUser({ userId, name, email }: IUserUpdateRequest) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (email && email !== user.email) {
      const emailAlreadyInUse = await userRepository.findOne({ email });
      if (emailAlreadyInUse) {
        throw new AppError('Email already in use');
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await userRepository.save(user);
    return user;
  }
}
