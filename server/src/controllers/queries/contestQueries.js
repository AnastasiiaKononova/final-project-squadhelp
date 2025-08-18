const db = require('../../models');
const ServerError = require('../../errors/ServerError');
const { fn, col } = require('sequelize');
const CONSTANTS = require('../../constants');

module.exports.updateContest = async (data, predicate, transaction) => {
  const [updatedCount, updatedRows] = await db.Contest.update(data, {
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
  const updateResult = await db.Contest.update(data, {
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

module.exports.getContests = async (req) => {
  const { typeIndex, industry, awardSort } = req.query;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = parseInt(req.query.offset, 10) || 0;
  const ownEntries = req.query.ownEntries === 'true' || req.query.ownEntries === '1';
  return  await db.Contest
    .scope([
      { method: ['byTypeIndex', typeIndex] },
      { method: ['byIndustry', industry] },
      { method: ['orderByAward', awardSort] },
      'onlyActiveAndFinished',
      'orderByIdDesc',
    ])
    .findAll({
      limit,
      offset,
      attributes: {
        include: [
          [
            fn('COUNT', col('Offers.id')), 'count',
          ],
        ],
      },
      include: [
        {
          model: db.Offer,
          required: ownEntries,
          where: ownEntries ? { userId: req.tokenData.userId } : {},
          attributes: [],
        },
      ],
      group: ['Contests.id'],
      subQuery: false,
    });
};

module.exports.getCustomerContests = async (query, userId) => {
  const { contestStatus, limit, offset } = query;
  return await db.Contest.scope([
    { method: ['byUser', parseInt(userId)] },
    { method: ['byStatus', contestStatus] },
    'orderByIdDesc',
  ]).findAll({
    limit: parseInt(limit, 10) || 10,
    offset: parseInt(offset, 10) || 0,
    attributes: {
      include: [
        [
          fn('COUNT', col('Offers.id')), 'count',
        ],
      ],
    },
    include: [
      {
        model: db.Offer,
        required: false,
        attributes: [],
      },
    ],
    group: ['Contest.id'],
    subQuery: false,
  });
};

module.exports.getContestById = async (contestId, userId, role) => {
  const contestInfo = await db.Contest.findOne({
    where: { id: contestId },
    order: [[db.Offer, 'id', 'asc']],
    include: [
      {
        model: db.User,
        required: true,
        attributes: {
          exclude: ['password', 'role', 'balance', 'accessToken'],
        },
      },
      {
        model: db.Offer,
        required: false,
        where: role === CONSTANTS.CREATOR ? { userId } : {},
        attributes: {
          exclude: ['userId', 'contestId'],
        },
        include: [
          {
            model: db.User,
            required: true,
            attributes: {
              exclude: ['password', 'role', 'balance', 'accessToken'],
            },
          },
          {
            model: db.Rating,
            required: false,
            where: { userId },
            attributes: ['mark'],
          },
        ],
      },

    ],
  });

  if (!contestInfo) {
    throw new ServerError('Contest not found');
  }

  return contestInfo.get({ plain: true });
};

module.exports.findContestForUser = async (contestId, userId, role) => {
  if (role === CONSTANTS.CUSTOMER) {
    return db.Contest.findOne({
      where: {
        id: contestId,
        userId,
      },
    });
  } else if (role === CONSTANTS.CREATOR) {
    return db.Contest.findOne({
      where: {
        id: contestId,
        status: {
          [db.Sequelize.Op.or]: [
            CONSTANTS.CONTEST_STATUS_ACTIVE,
            CONSTANTS.CONTEST_STATUS_FINISHED,
          ],
        },
      },
    });
  }
  return null;
};

module.exports.findContestStatusById = async (contestId) => {
  return db.Contest.findOne({
    where: { id: contestId },
    attributes: ['status'],
  });
};

module.exports.findCustomerContestActive = async (userId, contestId) => {
  return db.Contest.findOne({
    where: {
      userId,
      id: contestId,
      status: CONSTANTS.CONTEST_STATUS_ACTIVE,
    },
  });
};

module.exports.findContestNotFinished = async (userId, contestId) => {
  return db.Contest.findOne({
    where: {
      userId,
      id: contestId,
      status: { [db.Sequelize.Op.not]: CONSTANTS.CONTEST_STATUS_FINISHED },
    },
  });
};
