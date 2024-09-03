import multer from 'multer';
import { Router } from 'express';

import multerConfig from './config/multer';
const router = Router();

const upload = multer(multerConfig);

import { UserCreateController } from './controllers/UserControllers/UserCreate';
import { UserDeleteController } from './controllers/UserControllers/UserDelete';
import { UserGetAllController } from './controllers/UserControllers/UserGetAll';
import { UserGetOneController } from './controllers/UserControllers/UserGetOne';
import { UserUpdateController } from './controllers/UserControllers/UserUpdate';

const userCreateController = new UserCreateController();
const userGetAllController = new UserGetAllController();
const userGetOneController = new UserGetOneController();
const userUpdateController = new UserUpdateController();
const userDeleteController = new UserDeleteController();

router.post('/users', userCreateController.create);
router.get('/users', userGetAllController.list);
router.get('/users/:id', userGetOneController.show);
router.put('/users/:id', upload.single('avatar'), userUpdateController.update);
router.delete('/users/:id', userDeleteController.delete);

export default router;
