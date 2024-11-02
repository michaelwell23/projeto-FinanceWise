import { Router } from 'express';

import { UserCreateController } from '../controllers/User/UserCreateController';
import { UserUpdateController } from '../controllers/User/UserUpdateController';
import { UserDeleteController } from '../controllers/User/UserDeleteController';

const userRouter = Router();

const userCreateController = new UserCreateController();
const userUpdateController = new UserUpdateController();
const userDeleteController = new UserDeleteController();

userRouter.post(
  '/users',
  userCreateController.create.bind(userCreateController)
);
userRouter.put(
  '/users/:id',
  userUpdateController.update.bind(userUpdateController)
);
userRouter.delete(
  '/users/:id',
  userDeleteController.delete.bind(userDeleteController)
);

export default userRouter;
