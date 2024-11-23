import { Router } from 'express';

import { AccountCreateController } from '../controllers/Account/AccountCreateController';
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

accountRouter.get('/accounts', accountGetController.getAll);
accountRouter.get('/accounts/:id', accountGetController.getOne);
accountRouter.post('/accounts', accountCreateController.create);
accountRouter.put('/accounts/:id', accountUpdateController.update);
accountRouter.delete('/accounts/:id', accountDeleteController.delete);

export default accountRouter;
