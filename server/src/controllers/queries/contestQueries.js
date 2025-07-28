const bd = require('../../models');
const ServerError = require('../../errors/ServerError');

module.exports.updateContest = async (data, predicate, transaction) => {
  const [updatedCount, updatedRows] = await bd.Contests.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });

  const updatedContest = updatedRows[0];

  if (updatedCount < 1 || !updatedContest) {
    throw new ServerError('Contest not found or cannot update');
  }

  return updatedContest.get({ plain: true });
};

module.exports.updateContestStatus = async (data, predicate, transaction) => {
  const updateResult = await bd.Contests.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (updateResult[ 0 ] < 1) {
    throw new ServerError('Cannot update Contest');
  } else {
    return updateResult[ 1 ][ 0 ].dataValues;
  }
};

