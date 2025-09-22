const ApplicationError = require('./ApplicationError');

class RightsError extends ApplicationError {
  constructor(message = 'Not enough rights') {
    super(message, 403);
  }
}

module.exports = RightsError;
