import { Request, Response } from 'express';
import { TaskService } from '../../services/TaskServices/CreateTastk';
import { User } from '../../entities/User';

export class CreateTaskController {
  async create(req: Request, res: Response) {
    const { name, urgency, importance, commitmentId } = req.body;
    const user = req.user as User;

    const taskService = new TaskService();

    if (!user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const task = await taskService.createTask(
      user,
      name,
      urgency,
      importance,
      commitmentId ? Number(commitmentId) : undefined
    );

    return res.status(201).json(task);
  }
}
