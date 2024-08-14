import { getCustomRepository } from 'typeorm';
import { ConnectionRepository } from '../repositories/ConnectionRepository';
import { Connection } from '../entities/Connection';

export class ConnectionService {
  private connectionRepository = getCustomRepository(ConnectionRepository);

  public async createConnection(
    user1Id: string,
    user2Id: string,
    user1Skill: string,
    user2Skill: string,
    user1TeachingDuration: number,
    user2TeachingDuration: number,
    user1Availability: string,
    user2Availability: string
  ): Promise<Connection> {
    const connection = this.connectionRepository.create({
      user1Id,
      user2Id,
      user1Skill,
      user2Skill,
      user1TeachingDuration,
      user2TeachingDuration,
      user1Availability,
      user2Availability,
    });

    await this.connectionRepository.save(connection);

    return connection;
  }
}
