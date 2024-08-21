import { validateUser } from './middlewares/validateUser';
import { Router } from 'express';
import multer from 'multer';

import { UsersController } from './controllers/UsersController';

import multerConfig from './config/multer';
import { authMiddleware } from './middlewares/authmiddleware';
import { ConnectionController } from './controllers/ConnectionsController';
import { NotificationController } from './controllers/NotificationsController';

const router = Router();
const upload = multer(multerConfig);

const usersController = new UsersController();
const connectionsController = new ConnectionController();
const notificationController = new NotificationController();

router.post(
  '/users',
  upload.single('avatar'),
  validateUser,
  usersController.createUsers
);

router.use(authMiddleware);

router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUserById);
router.put('/users/:id', upload.single('avatar'), usersController.upadate);
router.delete('/users/:id', usersController.delete);

router.post('/connections', connectionsController.createConnection);
router.get('/connections', connectionsController.listConnections);
router.post('/connections', connectionsController.acceptConnection);

router.post('/notifications', notificationController.sendNotification);
router.patch(
  '/notifications/:notificationId/read',
  notificationController.markNotificationAsRead
);

export default router;
