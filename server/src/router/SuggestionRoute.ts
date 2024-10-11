import { Router } from 'express';
import authMiddleware from '../middleware/auth';

import { SuggestionCreateController } from '../controllers/SuggestionControllers/CreateSuggestionController';
import { SuggestionGetAllController } from '../controllers/SuggestionControllers/GetAllSuggestionController';

const router = Router();

const suggestionCreateController = new SuggestionCreateController();
const suggestionGetAllService = new SuggestionGetAllController();

router.post(
  '/suggestions',
  authMiddleware,
  suggestionCreateController.getSuggestion
);
router.get('/suggestions', authMiddleware, suggestionGetAllService.getAll);

export default router;
