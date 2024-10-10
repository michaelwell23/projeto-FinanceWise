import { Router } from 'express';
import { SuggestionController } from '../controllers/SuggestionControllers/CreateSuggestionController';
import authMiddleware from '../middleware/auth';

const router = Router();

const suggestionController = new SuggestionController();

router.post('/suggestions', authMiddleware, suggestionController.getSuggestion);

export default router;
