import { Request, Response } from 'express';
import { NotificationService } from '../services/NotificationsService';

export class NotificationController {
  async sendNotification(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { userId, content } = request.body;

    const notificationService = new NotificationService();

    try {
      await notificationService.createNotification(userId, content);
      return response
        .status(200)
        .json({ message: 'Notification sent successfully' });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async markNotificationAsRead(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { notificationId } = request.params;

    const notificationService = new NotificationService();

    try {
      await notificationService.markAsRead(notificationId);
      return response
        .status(200)
        .json({ message: 'Notification marked as read' });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}
