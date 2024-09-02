import multer from 'multer';
import { Router } from 'express';

import { UserController } from './controllers/UsersController';

import multerConfig from './config/multer';

const router = Router();
const upload = multer(multerConfig);

const userController = new UserController();

router.post('/users', upload.single('avatar'), userController.create);
router.get('/users', userController.list);
router.get('/users/:id', userController.show);
router.put('/users/:id', upload.single('avatar'), userController.update);
router.delete('/users/:id', userController.delete);

export default router;
