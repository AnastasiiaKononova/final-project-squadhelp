const path = require('path');
const ServerError =require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const contestQueries = require('./queries/contestQueries');
const CONSTANTS = require('../constants');

module.exports.getContestById = async (req, res, next) => {
  try {
    const {
      params: { id: contestId },
      tokenData: { userId, role },
    } = req;

    const contest = await contestQueries.getContestById({ contestId, userId, role });
    res.send(contest);
  }catch (err) {
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

  if (!contestId) {
    return next(new ServerError('Invalid contest'));
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
  const { query, tokenData: { userId } } = req;
  try {
    const contests = await contestQueries.getCustomerContests(query, userId);
    const haveMore = contests.length > 0;
    res.status(200).send({ contests, haveMore });
  } catch (err) {
    next(new ServerError(err.message));
  }
};

module.exports.getContests = async (req, res, next) => {
  try {
    const contests = await contestQueries.getContests(req);
    const haveMore = contests.length > 0;
    res.send({ contests, haveMore });
  } catch (err) {
    next(new ServerError(err.message));
  }
};

