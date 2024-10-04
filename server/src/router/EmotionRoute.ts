import multer from 'multer';
import { Router } from 'express';

import authMiddleware from '../middleware/auth';

import { EmotionCreateController } from '../controllers/EmotionControllers/EmotionCreateController';
import { EmotionGetAllController } from '../controllers/EmotionControllers/EmotionGetAll';

const emotionRouter = Router();

const emotionCreateController = new EmotionCreateController();
const emotionGetAllController = new EmotionGetAllController();

emotionRouter.use(authMiddleware);
emotionRouter.post('/emotion', emotionCreateController.create);
emotionRouter.get(
  '/emotions/:userId',
  emotionGetAllController.getEmotionsByUser
);

export default emotionRouter;
