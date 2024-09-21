import { Router } from 'express';
import { CreateCommitmentController } from '../controllers/CommitmentController/CreateCommitment';
import authMiddleware from '../middleware/auth';

const router = Router();

const createCommitmentController = new CreateCommitmentController();

router.post('/commitments', authMiddleware, createCommitmentController.create);
// router.get('/commitments', authMiddleware, createCommitmentController.list);
// router.put('/commitments/:id', authMiddleware, createCommitmentController.update);
// router.delete('/commitments/:id', authMiddleware, createCommitmentController.delete);

export default router;
