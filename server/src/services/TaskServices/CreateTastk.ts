import { getCustomRepository } from 'typeorm';
import { TaskRepository } from '../../repositories/TaskRepository';
import { User } from '../../entities/User';
import { Commitment } from '../../entities/Commitment';

export class TaskService {
  async createTask(
    user: User,
    name: string,
    urgency: number,
    importance: number,
    commitmentId?: number
  ) {
    const taskRepository = getCustomRepository(TaskRepository);

    let commitment = null;

    if (commitmentId) {
      commitment = await taskRepository.manager.findOne(Commitment, {
        where: { id: commitmentId },
      });
    }

    const task = taskRepository.create({
      name,
      urgency,
      importance,
      user,
      commitment,
    });

    await taskRepository.save(task);

    return task;
  }
}
