import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class UserService {
  async register({ name, email, password }: CreateUserDTO): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error('User already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }

  async authenticate(email: string, password: string): Promise<string> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials.');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return token;
  }
}
