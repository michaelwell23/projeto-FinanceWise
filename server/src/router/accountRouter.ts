import { Router } from 'express';

import { AccountCreateController } from '../controllers/Account/AcountCreateController';
import { AccountUpdateController } from '../controllers/Account/AccountUpdateController';
import { AccountDeleteController } from '../controllers/Account/AccountDeleteController';
import { authMiddleware } from '../middleware/Authenticate';

const accountRouter = Router();

const accountCreateController = new AccountCreateController();
const accountUpdateController = new AccountUpdateController();
const accountDeleteController = new AccountDeleteController();

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

// accountRouter.get(
//   '/accounts',
//   ensureAuthenticated,
//   accountListController.list.bind(accountListController)
// );

export default accountRouter;
