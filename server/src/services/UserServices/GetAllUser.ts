import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../repositories/UsersRepository';
import { User } from '../../entities/User';

export class UserGetAllServices {
  public async getAllUser(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);

    const users = await userRepository.find();

    return users;
  }
}
