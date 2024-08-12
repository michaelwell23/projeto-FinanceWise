import { Router } from 'express';
import multer from 'multer';

import { UsersController } from './controllers/UsersController';
import multerConfig from './config/multer';
import { authMiddleware } from './middlewares/authmiddleware';

const router = Router();
const upload = multer(multerConfig);

const usersController = new UsersController();

router.post('/users', upload.single('avatar'), usersController.createUsers);

router.use(authMiddleware);

router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUserById);
router.put('/users/:id', upload.single('avatar'), usersController.upadate);
router.delete('/users/:id', usersController.delete);

export default router;
