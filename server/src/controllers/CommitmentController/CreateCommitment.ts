import { Request, Response } from 'express';
import { CommitmentCreateService } from '../../services/CommitmentServices/CreateCommitment';
import { User } from '../../entities/User';

export class CreateCommitmentController {
  async create(req: Request, res: Response) {
    const { name, necessity, value } = req.body;
    const user = req.user as User;

    const commitmentCreateService = new CommitmentCreateService();

    if (!user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const commitment = await commitmentCreateService.createCommitment(
      user,
      name,
      necessity,
      value
    );
    return res.status(201).json(commitment);
  }
}
