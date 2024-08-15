import { getRepository } from 'typeorm';
import { Connection } from '../entities/Connection';

interface ICreateConnection {
  user1Id: string;
  user2Id: string;
  user1Skill: string;
  user2Skill: string;
  user1TeachingDuration: number;
  user1Availability: string;
}

interface IAcceptConnection {
  user2TeachingDuration: number;
  user2Availability: string;
}

export class ConnectionService {
  private connectionRepository = getRepository(Connection);

  public async createConnection({
    user1Id,
    user2Id,
    user1Skill,
    user2Skill,
    user1TeachingDuration,
    user1Availability,
  }: ICreateConnection) {
    const connection = this.connectionRepository.create({
      user1: { id: user1Id },
      user2: { id: user2Id },
      user1Skill,
      user2Skill,
      user1TeachingDuration,
      user1Availability,
    });

    await this.connectionRepository.save(connection);

    return connection;
  }

  async listConnections() {
    return await this.connectionRepository.find({
      relations: ['user1', 'user2'],
    });
  }

  public async acceptConnection(
    connectionId: string,
    { user2TeachingDuration, user2Availability }: IAcceptConnection
  ) {
    const connection = await this.connectionRepository.findOne(connectionId);

    if (!connection) {
      throw new Error('Connection not found');
    }

    connection.user2TeachingDuration = user2TeachingDuration;
    connection.user2Availability = user2Availability;

    await this.connectionRepository.save(connection);

    return connection;
  }
}
