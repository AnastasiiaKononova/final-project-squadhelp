const bd = require('../../models');
const BankDeclineError = require('../../errors/BankDeclineError');
const CONSTANTS = require('../../constants');
const NotEnoughMoney = require('../../errors/NotEnoughMoney');


module.exports.transferFunds = async ({ userCardNumber, cvc, expiry, amount, transaction }) => {
  const findAccountOrThrow = async (where, errorMessage) => {
    const account = await bd.Banks.findOne({
      where,
      transaction,
      lock: transaction.LOCK.UPDATE,
    });
    if (!account) throw new BankDeclineError(errorMessage);
    return account;
  };

  const userBankAccount = await findAccountOrThrow(
    { cardNumber: userCardNumber, cvc, expiry },
    'Invalid card details',
  );

  const internalBankAccount = await findAccountOrThrow(
    {
      cardNumber: CONSTANTS.SQUADHELP_BANK_NUMBER,
      cvc: CONSTANTS.SQUADHELP_BANK_CVC,
      expiry: CONSTANTS.SQUADHELP_BANK_EXPIRY,
    },
    'Internal bank account not found',
  );

  const failedCheck = [
    {
      condition: amount > 0 && userBankAccount.balance < amount,
      error: new NotEnoughMoney('Not enough money on user card'),
    },
    {
      condition: amount < 0 && internalBankAccount.balance < Math.abs(amount),
      error: new NotEnoughMoney('Not enough money on company account'),
    },
  ].find(({ condition }) => condition);

  if (failedCheck) throw failedCheck.error;

  userBankAccount.balance = Number(userBankAccount.balance) - amount;
  internalBankAccount.balance = Number(internalBankAccount.balance) + amount;

  await userBankAccount.save({ transaction });
  await internalBankAccount.save({ transaction });
};
