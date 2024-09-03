import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../repositories/UsersRepository';
import { User } from '../../entities/User';

export class UserGetOne {
  public async getOneUser(id: string): Promise<User | undefined> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);

    return user;
  }
}
