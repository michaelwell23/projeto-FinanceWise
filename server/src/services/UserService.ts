import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepositorie';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';

interface UserRequest {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

class UserService {
  async createUser({
    name,
    email,
    password,
    avatar,
  }: UserRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await userRepository.findOne({ email });
    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    await userRepository.save(user);
    return user;
  }
}

export { UserService };
