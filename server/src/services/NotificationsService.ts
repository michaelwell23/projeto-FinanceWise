import { getCustomRepository } from 'typeorm';
import { NotificationRepository } from '../repositories/NotificationsRepository';
import transporter from '../config/email';
import webPush from '../config/push';

export class NotificationService {
  async sendEmailNotification(email: string, subject: string, message: string) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
    });
  }

  async sendPushNotification(subscription: any, payload: string) {
    await webPush.sendNotification(subscription, payload);
  }

  async createNotification(userId: string, content: string) {
    const notificationRepository = getCustomRepository(NotificationRepository);

    const notification = notificationRepository.create({
      content,
      user: { id: userId },
    });

    await notificationRepository.save(notification);
  }

  async markAsRead(notificationId: string) {
    const notificationRepository = getCustomRepository(NotificationRepository);

    const notification = await notificationRepository.findOne(notificationId);
    if (notification) {
      notification.read = true;
      await notificationRepository.save(notification);
    }
  }
}
