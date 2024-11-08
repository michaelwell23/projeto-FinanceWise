import { Router } from 'express';

import { AccountCreateController } from '../controllers/Account/AcountCreateController';
import { AccountUpdateController } from '../controllers/Account/AccountUpdateController';
import { AccountDeleteController } from '../controllers/Account/AccountDeleteController';
import { AccountGetController } from '../controllers/Account/AccountGetController';
import { authMiddleware } from '../middleware/Authenticate';

const accountRouter = Router();

const accountCreateController = new AccountCreateController();
const accountUpdateController = new AccountUpdateController();
const accountDeleteController = new AccountDeleteController();
const accountGetController = new AccountGetController();

accountRouter.get(
  '/accounts',
  accountGetController.getAll.bind(accountGetController)
);

accountRouter.post(
  '/accounts',
  accountCreateController.create.bind(accountCreateController)
);

accountRouter.put(
  '/accounts/:id',
  accountUpdateController.update.bind(accountUpdateController)
);

accountRouter.delete(
  '/accounts/:id',
  accountDeleteController.delete.bind(accountDeleteController)
);

accountRouter.get(
  '/accounts/:id',
  accountGetController.getOne.bind(accountGetController)
);

export default accountRouter;
