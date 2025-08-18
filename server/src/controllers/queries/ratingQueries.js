const db = require('../../models');
const ServerError = require('../../errors/ServerError');

const _updateRating = async (data, predicate, transaction) => {
  const [updatedCount, [updatedRating]] = await db.Rating.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError('Cannot update mark on this offer');
  }
  return updatedRating.get({ plain: true });
};

const _createRating = async (data, transaction) => {
  try {
    const result = await db.Rating.create(data, { transaction });
    return result.get({ plain: true });
  } catch {
    throw new ServerError('Cannot mark offer');
  }
};

module.exports.createOrUpdateRating = async (data, transaction) => {
  const { offerId, userId, isFirst } = data;
  return isFirst ? _createRating(data, transaction) : _updateRating(data, { offerId, userId }, transaction);
};

module.exports.calcRatingAvgByUser = async (userId, transaction) => {
  const offersArray = await db.Rating.findAll({
    include: [
      {
        model: db.Offer,
        required: true,
        where: { userId },
      },
    ],
    transaction,
  });
  const sum = offersArray.reduce((acc, curr) => acc + curr.dataValues.mark, 0);
  return offersArray.length ? (sum/offersArray.length) : 0 ;
};

