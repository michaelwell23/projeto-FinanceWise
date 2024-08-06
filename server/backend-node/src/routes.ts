import { Router, Request, Response } from 'express';
import multer from 'multer';

import { UsersController } from './controllers/UsersController';
import multerConfig from './config/multer';

const router = Router();
const upload = multer(multerConfig);

const usersController = new UsersController();

router.post('/users', upload.single('avatar'), usersController.create);

export default router;
