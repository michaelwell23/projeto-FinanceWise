import { Router } from 'express';

import { UserCreateController } from '../controllers/User/UserCreateController';
import { UserUpdateController } from '../controllers/User/UserUpdateController';
import { UserDeleteController } from '../controllers/User/UserDeleteController';

const userRouter = Router();

const userCreateController = new UserCreateController();
const userUpdateController = new UserDeleteController();
const userDeleteController = new UserDeleteController();

userRouter.post('/users', userCreateController.create);
userRouter.put('/users/:id', userUpdateController.update);
userRouter.delete('/users/:id', userDeleteController.delete);

export default userRouter;
