const db = require('../models');
const { transferFunds } = require('./queries/bankQueries');
const { calculatePrize, generateOrder } = require('../utils/orderHelper');
const NotEnoughMoney = require('../errors/NotEnoughMoney');
const ServerError = require('../errors/ServerError');
const { findUserWithLock } = require('./queries/userQueries');

module.exports.payment = async (req, res, next) => {
  const userCardNumber = req.body.number.replace(/ /g, '');
  const price = Number(req.body.price);

  let transaction;
  try {
    transaction = await db.sequelize.transaction();

    await transferFunds({
      userCardNumber,
      cvc: req.body.cvc,
      expiry: req.body.expiry,
      amount: price,
      transaction,
    });

    const { orderId, createdAt } = generateOrder();

    const contestsData = req.body.contests.map((contest, index) => {

      return {
        ...contest,
        status: index === 0 ? 'active' : 'pending',
        userId: req.tokenData.userId,
        priority: index + 1,
        orderId,
        createdAt,
        prize: calculatePrize(price, req.body.contests.length, index),
        fileName: contest.fileName || null,
        originalFileName: contest.originalFileName || null,
      };
    });

    await db.Contest.bulkCreate(contestsData, { transaction });

    await transaction.commit();

    res.status(200).send({ success: true, orderId });
  } catch (err) {
    if (transaction) await transaction.rollback();
    next(err);
  }
};

module.exports.cashout = async (req, res, next) => {
  const userCardNumber = req.body.number.replace(/ /g, '');
  const payoutAmount = Number(req.body.sum);

  let transaction;
  try {
    transaction = await db.sequelize.transaction();

    const user = await findUserWithLock(req.tokenData.userId, transaction);

    if (!user) {
      throw new ServerError('User not found');
    }

    if (user.balance < payoutAmount) {
      throw new NotEnoughMoney('Not enough funds on your account');
    }

    await transferFunds({
      userCardNumber,
      cvc: req.body.cvc,
      expiry: req.body.expiry,
      amount: -payoutAmount,
      transaction,
    });

    user.balance -= payoutAmount;
    await user.save({ transaction });

    await transaction.commit();

    res.status(200).send({ success: true, balance: user.balance });
  } catch (err) {
    if (transaction) await transaction.rollback();
    next(err);
  }
};

