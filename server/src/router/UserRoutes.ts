import multer from 'multer';
import { Router } from 'express';

import { ensureAuthenticated } from '../middleware/auth';
import { UserCreateController } from '../controllers/UserControllers/UserCreate';
import { UserDeleteController } from '../controllers/UserControllers/UserDelete';
import { UserGetAllController } from '../controllers/UserControllers/UserGetAll';
import { UserGetOneController } from '../controllers/UserControllers/UserGetOne';
import { UserUpdateController } from '../controllers/UserControllers/UserUpdate';

const userRouter = Router();

import multerConfig from '../config/multer';
const upload = multer(multerConfig);

const userCreateController = new UserCreateController();
const userGetAllController = new UserGetAllController();
const userGetOneController = new UserGetOneController();
const userUpdateController = new UserUpdateController();
const userDeleteController = new UserDeleteController();

userRouter.post('/users', userCreateController.create);

userRouter.use(ensureAuthenticated);

userRouter.get('/users', userGetAllController.list);
userRouter.get('/users/:id', userGetOneController.show);
userRouter.put(
  '/users/:id',
  upload.single('avatar'),
  userUpdateController.update
);
userRouter.delete('/users/:id', userDeleteController.delete);

export default userRouter;
