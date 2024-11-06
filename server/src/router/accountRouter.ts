import { Router } from 'express';

import { AccountCreateController } from '../controllers/Account/AcountCreateController';
import { AccountUpdateController } from '../controllers/Account/AccountUpdateController';
import { authMiddleware } from '../middleware/Authenticate';

const accountRouter = Router();

const accountCreateController = new AccountCreateController();
const accountUpdateController = new AccountUpdateController();

accountRouter.post(
  '/accounts',
  accountCreateController.create.bind(accountCreateController)
);

accountRouter.put(
  '/accounts/:id',
  accountUpdateController.update.bind(accountUpdateController)
);

// accountRouter.delete(
//   '/accounts/:id',
//   ensureAuthenticated,
//   accountDeleteController.delete.bind(accountDeleteController)
// );

// accountRouter.get(
//   '/accounts',
//   ensureAuthenticated,
//   accountListController.list.bind(accountListController)
// );

export default accountRouter;
