import { getCustomRepository } from 'typeorm';
import { CommitmentRepository } from '../../repositories/CommitmentRepository';
import { User } from '../../entities/User';

export class CommitmentCreateService {
  public async createCommitment(
    user: User,
    name: string,
    necessity: number,
    value: number
  ) {
    const commitmentRepository = getCustomRepository(CommitmentRepository);

    const commitment = commitmentRepository.create({
      name,
      necessity,
      value,
      user,
    });

    await commitmentRepository.save(commitment);

    return commitment;
  }
}
