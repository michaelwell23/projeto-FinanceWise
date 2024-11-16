import { Router } from 'express';

import { upload } from '../config/multer';
import authMiddleware from '../middleware/auth';

import { UserCreateController } from '../controllers/User/UserCreateController';
import { UserUpdateController } from '../controllers/User/UserUpdateController';
import { UserDeleteController } from '../controllers/User/UserDeleteController';

const userRouter = Router();

const userCreateController = new UserCreateController();
const userUpdateController = new UserUpdateController();
const userDeleteController = new UserDeleteController();

userRouter.post('/users', upload.single('avatar'), userCreateController.create);

userRouter.put(
  '/users/:id',
  authMiddleware,
  upload.single('avatar'),
  userUpdateController.update
);
userRouter.delete('/users/:id', authMiddleware, userDeleteController.delete);

export default userRouter;
