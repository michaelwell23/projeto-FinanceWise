import { Router } from 'express';
import multer from 'multer';

import { UsersController } from './controllers/UsersController';
import multerConfig from './config/multer';

const router = Router();
const upload = multer(multerConfig);

const usersController = new UsersController();

router.post('/users', upload.single('avatar'), usersController.createUsers);
router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUserById);
router.put('/users/:id', usersController.upadate);

export default router;
