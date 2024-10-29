import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';

export class UserService {
  private userRepository = new UserRepository();

  async createUser(
    name: string,
    email: string,
    password: string,
    avatar?: string
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.avatar = avatar;

    return this.userRepository.create(user);
  }

  async updateUser(id: string, data: Partial<User>) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new Error('User not found');

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await this.userRepository.update(id, data);
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new Error('User not found');

    await this.userRepository.delete(id);
  }
}
