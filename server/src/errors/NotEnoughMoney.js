const ApplicationError = require('./ApplicationError');

class NotEnoughMoneyError extends ApplicationError{
  constructor (message = 'Not enough money') {
    super(message, 406);
  }
}

module.exports = NotEnoughMoneyError;

