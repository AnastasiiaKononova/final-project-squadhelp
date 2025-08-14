const offerRouter = require('express').Router();
const upload = require('../utils/fileUpload');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const OfferController = require('../controllers/Offer.controller');

offerRouter.post(
  '/',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  OfferController.setNewOffer,
);

offerRouter.put(
  '/:id/status',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  OfferController.setOfferStatus,
);

module.exports = offerRouter;
