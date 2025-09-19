const ApplicationError = require('./ApplicationError');

class BankDeclineError extends ApplicationError {
  constructor(message = 'Bank declined transaction') {
    super(message, 403);
  }
}

module.exports = BankDeclineError;
