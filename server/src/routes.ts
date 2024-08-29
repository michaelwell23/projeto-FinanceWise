import { Router } from 'express';
import { UserController } from './controllers/UsersController';

const router = Router();

const userController = new UserController();

router.post('/users', userController.create);
router.get('/users', userController.list);
router.get('/users/:id', userController.show);
router.put('/users/:id', userController.update);

export default router;
