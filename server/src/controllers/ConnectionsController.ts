import { Request, Response } from 'express';
import { ConnectionService } from '../services/ConnectionServices';

export class ConnectionController {
  async createConnection(
    request: Request,
    response: Response
  ): Promise<Response> {
    const {
      user1Id,
      user2Id,
      user1Skill,
      user2Skill,
      user1TeachingDuration,
      user1Availability,
    } = request.body;

    const connectionService = new ConnectionService();

    try {
      const connection = await connectionService.createConnection({
        user1Id,
        user2Id,
        user1Skill,
        user2Skill,
        user1TeachingDuration,
        user1Availability,
      });

      return response.status(201).json(connection);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async listConnections(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const connectionService = new ConnectionService();
      const connections = await connectionService.listConnections();
      return response.status(200).json(connections);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async acceptConnection(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { connectionId } = request.params;
    const { user2TeachingDuration, user2Availability } = request.body;

    try {
      const connectionService = new ConnectionService();

      const connection = await connectionService.acceptConnection(
        connectionId,
        {
          user2TeachingDuration,
          user2Availability,
        }
      );

      return response.status(200).json(connection);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
