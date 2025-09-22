const ApplicationError = require('./ApplicationError');

class TokenError extends ApplicationError {
  constructor(message = 'Token error') {
    super(message, 401);
  }
}

module.exports = TokenError;

