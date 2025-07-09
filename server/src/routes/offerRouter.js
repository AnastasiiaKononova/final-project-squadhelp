const offerRouter = require('express').Router();
const checkToken = require('../middlewares/checkToken');
const upload = require('../utils/fileUpload');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const ContestController = require('../controllers/Contest.controller');

offerRouter.post(
  '/',
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  ContestController.setNewOffer,
);

offerRouter.put(
  '/:id/status',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  ContestController.setOfferStatus,
);

module.exports = offerRouter;