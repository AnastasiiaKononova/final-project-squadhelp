const db = require('../models');
const path = require('path');
const ServerError =require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const contestQueries = require('./queries/contestQueries');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');

module.exports.dataForContest = async (req, res, next) => {
  const response = {};
  try {
    const { characteristic1, characteristic2 } = req.query;

    const types = [characteristic1, characteristic2, 'industry'].filter(Boolean);

    const characteristics = await db.Selects.findAll({
      where: {
        type: {
          [ db.Sequelize.Op.in ]: types,
        },
      },
    });
    if (!characteristics || characteristics.length === 0) {
      throw new NotFoundError('No characteristics found');
    }
    characteristics.forEach(characteristic => {
      if (!response[ characteristic.type ]) {
        response[ characteristic.type ] = [];
      }
      response[ characteristic.type ].push(characteristic.describe);
    });
    res.status(200).send(response);
  } catch (err) {
    next(new ServerError(err.message));
  }
};

module.exports.getContestById = async (req, res, next) => {
  const {
    params: { id: contestId },
    tokenData: { userId, role },
  } = req;

  try {
    let contestInfo = await db.Contests.findOne({
      where: { id: contestId },
      order: [[db.Offers, 'id', 'asc']],
      include: [
        {
          model: db.Users,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
        {
          model: db.Offers,
          required: false,
          where: role === CONSTANTS.CREATOR ? { userId } : {},
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: db.Users,
              required: true,
              attributes: {
                exclude: ['password', 'role', 'balance', 'accessToken'],
              },
            },
            {
              model: db.Ratings,
              required: false,
              where: { userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });
    contestInfo = contestInfo.get({ plain: true });
    contestInfo.Offers.forEach(offer => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.send(contestInfo);
  } catch (err) {
    next(new ServerError(err.message));
  }
};

module.exports.downloadFile = async (req, res, next) => {
  try {
    const filename = path.basename(req.params.fileName);
    const file = path.join(CONSTANTS.CONTESTS_DEFAULT_DIR, filename);
    res.download(file, (err) => {
      if (err) {
        next(new NotFoundError());
      }
    });
  } catch (err) {
    next(new ServerError(err.message));
  }
};

module.exports.updateContest = async (req, res, next) => {
  const contestId = Number(req.params.id);
  const userId = req.tokenData?.userId;

  if (!contestId || !userId) {
    return next(new ServerError('Invalid contest id or user'));
  }

  if (req.file) {
    req.body.fileName = req.file.filename;
    req.body.originalFileName = req.file.originalname;
  }

  try {
    const updatedContest = await contestQueries.updateContest(req.body, {
      id: contestId,
      userId,
    });
    res.send(updatedContest);
  } catch (err) {
    next(new ServerError(err.message));
  }
};

module.exports.getCustomersContests = async (req, res, next) => {
  const {
    query: { contestStatus: status, limit, offset },
    tokenData: { userId },
  } = req;

  try {
    const where = { userId };
    if (status !== undefined) {
      where.status = status;
    }

    const contests = await db.Contests.findAll({
      where,
      limit: parseInt(limit, 10) || 10,
      offset: parseInt(offset, 10) || 0,
      order: [['id', 'DESC']],
      include: [
        {
          model: db.Offers,
          required: false,
          attributes: ['id'],
        },
      ],
    });

    contests.forEach(contest => {
      contest.dataValues.count = contest.dataValues.Offers.length;
    });

    const haveMore = contests.length > 0;
    res.status(200).send({ contests, haveMore });
  } catch (err) {
    next(new ServerError(err.message));
  }
};

module.exports.getContests = async (req, res, next) => {
  try {
    const {
      typeIndex,
      contestId,
      industry,
      awardSort,
    } = req.query;

    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;
    const ownEntries = req.query.ownEntries === 'true' || req.query.ownEntries === '1';


    const predicates = UtilFunctions.createWhereForAllContests(
      typeIndex,
      contestId,
      industry,
      awardSort,
    );

    const contests = await db.Contests.findAll({
      where: predicates.where,
      order: predicates.order,
      limit,
      offset,
      include: [
        {
          model: db.Offers,
          required: ownEntries,
          where: ownEntries
            ? { userId: req.tokenData.userId }
            : {},
          attributes: ['id'],
        },
      ],
    });

    contests.forEach(contest => {
      contest.dataValues.count = contest.dataValues.Offers.length;
    });

    const haveMore = contests.length > 0;

    res.send({ contests, haveMore });
  } catch (err) {
    next(new ServerError(err.message));
  }
};

