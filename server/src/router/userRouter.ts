import multer from 'multer';
import { Router } from 'express';

import { UserCreateController } from '../controllers/User/UserCreateController';

const userRouter = Router();

const userCreateController = new UserCreateController();

userRouter.post('/users', userCreateController.create);

export default userRouter;
