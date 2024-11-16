import { Router } from 'express';

import { AccountCreateController } from '../controllers/Account/AcountCreateController';
import { AccountUpdateController } from '../controllers/Account/AccountUpdateController';
import { AccountDeleteController } from '../controllers/Account/AccountDeleteController';
import { AccountGetController } from '../controllers/Account/AccountGetController';
import authMiddleware from '../middleware/auth';

const accountRouter = Router();

const accountCreateController = new AccountCreateController();
const accountUpdateController = new AccountUpdateController();
const accountDeleteController = new AccountDeleteController();
const accountGetController = new AccountGetController();

accountRouter.use(authMiddleware);

accountRouter.get('/accounts', authMiddleware, accountGetController.getAll);

accountRouter.post('/accounts', authMiddleware, accountCreateController.create);

accountRouter.put(
  '/accounts/:id',
  authMiddleware,
  accountUpdateController.update
);

accountRouter.delete(
  '/accounts/:id',
  authMiddleware,
  accountDeleteController.delete
);

accountRouter.get('/accounts/:id', authMiddleware, accountGetController.getOne);

export default accountRouter;
