const db = require('../models');
const ws = require('../socketInit');
const userQueries = require('./queries/userQueries');
const ratingQueries = require('./queries/ratingQueries');

module.exports.changeMark = async (req, res, next) => {
  let transaction;
  const { isFirst, offerId, mark, creatorId } = req.body;
  const { userId } = req.tokenData;

  try {
    transaction = await db.sequelize.transaction(
      { isolationLevel: db.Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED });

    await ratingQueries.createOrUpdateRating({ offerId, userId, mark, isFirst }, transaction);
    const avg = await ratingQueries.calcRatingAvgByUser(creatorId, transaction);
    await userQueries.updateUser({ rating: avg }, creatorId, transaction);
    await transaction.commit();

    ws.getNotificationController().emitChangeMark(creatorId);
    res.send({ userId: creatorId, rating: avg });
  } catch (err) {
    if (transaction) await transaction.rollback();
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.avatar = req.file.filename;
    }
    const updatedUser = await userQueries.updateUser(req.body,
      req.tokenData.userId);

    res.send({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      displayName: updatedUser.displayName,
      avatar: updatedUser.avatar,
      email: updatedUser.email,
      balance: updatedUser.balance,
      role: updatedUser.role,
      id: updatedUser.id,
    });
  } catch (err) {
    next(err);
  }
};


