import { Router } from 'express';

import authMiddleware from '../middleware/auth';

import { EmotionCreateController } from '../controllers/EmotionControllers/EmotionCreateController';
import { EmotionGetAllController } from '../controllers/EmotionControllers/EmotionGetAll';
import { EmotionDeleteControler } from '../controllers/EmotionControllers/EmotionDeleteController';

const emotionRouter = Router();

const emotionCreateController = new EmotionCreateController();
const emotionGetAllController = new EmotionGetAllController();
const emotionDeletelController = new EmotionDeleteControler();

emotionRouter.use(authMiddleware);
emotionRouter.post('/emotion', emotionCreateController.create);
emotionRouter.get(
  '/emotions/:userId',
  emotionGetAllController.getEmotionsByUser
);
emotionRouter.delete(
  '/emotions/:userId/:emotionId',
  emotionDeletelController.delete
);

export default emotionRouter;
