const db = require('../models');
const ServerError =require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const ws = require('../socketInit');
const CONSTANTS = require('../constants');


module.exports.setNewOffer = async (req, res, next) => {
  const obj = {};
  if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    obj.text = req.body.offerData;
  }
  obj.userId = req.tokenData.userId;
  obj.contestId = req.body.contestId;
  try {
    const result = await contestQueries.createOffer(obj);
    delete result.contestId;
    delete result.userId;
    ws.getNotificationController().emitEntryCreated(
      req.body.customerId);
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
    res.send(Object.assign({}, result, { User }));
  } catch (e) {
    return next(new ServerError());
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED },
    { id: offerId },
  );
  ws.getNotificationController().emitChangeOfferStatus(
    creatorId,
    'Someone of yours offers was rejected',
    contestId,
  );
  return rejectedOffer;
};

const resolveOffer = async (
  offerId, creatorId, contestId,
) => {

  const offer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_WON },
    { id: offerId },
  );

  ws.getNotificationController().emitChangeOfferStatus(
    creatorId,
    'Congratulations! Your offer has been selected as the winner.',
    contestId,
  );

  return offer;
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  try {
    if (req.body.command === 'reject') {

      const offer = await rejectOffer(
        req.params.id,
        req.body.creatorId,
        req.body.contestId,
      );
      return res.send(offer);
    }

    if (req.body.command === 'resolve') {
      transaction = await db.sequelize.transaction();

      const winningOffer = await resolveOffer(
        req.body.contestId,
        req.body.creatorId,
        req.body.orderId,
        req.params.id,
        req.body.priority,
        transaction,
      );

      await transaction.commit();
      return res.send(winningOffer);
    }

    throw new ServerError('Invalid command');
  } catch (err) {
    if (transaction) {
      try {
        await transaction.rollback();
      } catch (rollbackErr) {
        console.error('Rollback failed:', rollbackErr);
      }
    }
    next(err);
  }
};
