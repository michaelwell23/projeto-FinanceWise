import { Request, Response } from 'express';
import { CommitmentCreateService } from '../../services/CommitmentServices/CreateCommitment';

export class CreateCommitmentController {
  async create(req: Request, res: Response) {
    const { name, necessity, value } = req.body;
    const user = req.user as User;

    if (!user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const commitment = await commitmentService.createCommitment(
      user,
      name,
      necessity,
      value
    );
    return res.status(201).json(commitment);
  }
}
