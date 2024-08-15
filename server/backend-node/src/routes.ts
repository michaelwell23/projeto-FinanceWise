import { validateUser } from './middlewares/validateUser';
import { Router } from 'express';
import multer from 'multer';

import { UsersController } from './controllers/UsersController';

import multerConfig from './config/multer';
import { authMiddleware } from './middlewares/authmiddleware';
import { ConnectionController } from './controllers/ConnectionsController';

const router = Router();
const upload = multer(multerConfig);

const usersController = new UsersController();
const connectionsController = new ConnectionController();

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

export default router;
