import { Router } from 'express';
import { CreateTaskController } from '../controllers/TaskController/CreateTaskController';
import authMiddleware from '../middleware/auth';

const router = Router();

const createTaskController = new CreateTaskController();

router.post('/tasks', authMiddleware, createTaskController.create);
// router.get("/tasks", authMiddleware, taskController.list);
// router.put("/tasks/:id", authMiddleware, taskController.update);
// router.delete("/tasks/:id", authMiddleware, taskController.delete);

export default router;
