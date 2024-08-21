import { EntityRepository, Repository } from 'typeorm';

import { Notification } from '../entities/Notification';

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {
  findUnreadByUser(userId: string) {
    return this.find({ where: { user: userId, read: false } });
  }
}
