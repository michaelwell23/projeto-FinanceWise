import { Router } from 'express';

import { upload } from '../config/multer';
import { UserCreateController } from '../controllers/User/UserCreateController';
import { UserUpdateController } from '../controllers/User/UserUpdateController';
import { UserDeleteController } from '../controllers/User/UserDeleteController';

const userRouter = Router();

const userCreateController = new UserCreateController();
const userUpdateController = new UserUpdateController();
const userDeleteController = new UserDeleteController();

userRouter.post(
  '/users',
  upload.single('avatar'),
  userCreateController.create.bind(userCreateController)
);
userRouter.put(
  '/users/:id',
  upload.single('avatar'),
  userUpdateController.update.bind(userUpdateController)
);
userRouter.delete(
  '/users/:id',
  userDeleteController.delete.bind(userDeleteController)
);

export default userRouter;
