const bankingRouter = require('express').Router();
const BankingController = require('../controllers/Banking.controller');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const validators = require('../middlewares/validators');
const upload = require('../utils/fileUpload');

bankingRouter.post(
  '/pay',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  validators.validatePayment,
  BankingController.payment,
);

bankingRouter.post(
  '/withdraw',
  basicMiddlewares.onlyForCreative,
  BankingController.cashout,
);

module.exports = bankingRouter;
