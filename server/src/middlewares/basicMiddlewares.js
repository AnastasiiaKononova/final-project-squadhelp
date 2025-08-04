const RightsError = require('../errors/RightsError');
const ServerError = require('../errors/ServerError');
const CONSTANTS = require('../constants');
const contestQueries = require ('../controllers/queries/contestQueries');

module.exports.parseBody = (req, res, next) => {
  try {
    req.body.contests = JSON.parse(req.body.contests);
  } catch {
    return next(new ServerError('Invalid contests JSON'));
  }

  if (!Array.isArray(req.body.contests)) {
    return next(new ServerError('Contests should be an array'));
  }

  if (!req.files || !Array.isArray(req.files)) {
    req.files = [];
  }

  req.body.contests.forEach(contest => {
    if (contest.haveFile && req.files.length > 0) {
      const file = req.files.shift();
      contest.fileName = file.filename;
      contest.originalFileName = file.originalname;
    }
  });

  next();
};

module.exports.canGetContest = async (req, res, next) => {
  const contestId = Number(req.params.id);

  if (!contestId || isNaN(contestId)) {
    return next(new ServerError('Invalid contest ID'));
  }

  try {
    const result = await contestQueries.findContestForUser(
      contestId,
      req.tokenData.userId,
      req.tokenData.role,
    );

    if (!result) {
      return next(new RightsError('You do not have access to this contest'));
    }

    next();
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports.onlyForCreative = (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CUSTOMER) {
    return next(new RightsError());
  }
  next();
};

module.exports.onlyForCustomer = (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CREATOR) {
    return next(new RightsError('this page only for customers'));
  }
  next();
};

module.exports.canSendOffer = async (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CUSTOMER) {
    return next(new RightsError());
  }
  try {
    const result = await contestQueries.findContestStatusById(req.body.contestId);
    if (result.get({ plain: true }).status ===
      CONSTANTS.CONTEST_STATUS_ACTIVE) {
      next();
    } else {
      return next(new RightsError());
    }
  } catch (err) {
    next(new ServerError(err));
  }

};

module.exports.onlyForCustomerWhoCreateContest = async (req, res, next) => {
  try {
    const result = await contestQueries.findCustomerContestActive(
      req.tokenData.userId,
      req.body.contestId,
    );
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports.canUpdateContest = async (req, res, next) => {
  try {
    const result = await contestQueries.findContestNotFinished(
      req.tokenData.userId,
      req.body.contestId,
    );
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (err) {
    next(new ServerError(err));
  }
};

