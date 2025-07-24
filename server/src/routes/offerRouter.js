const offerRouter = require('express').Router();
const checkToken = require('../middlewares/checkToken');
const upload = require('../utils/fileUpload');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const OfferController = require('../controllers/Offer.controller');

offerRouter.post(
  '/',
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  OfferController.setNewOffer,
);

offerRouter.put(
  '/:id/status',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  OfferController.setOfferStatus,
);

module.exports = offerRouter;
