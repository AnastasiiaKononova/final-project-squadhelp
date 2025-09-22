const ApplicationError = require('./ApplicationError');

class ServerError extends ApplicationError {
  constructor(message = 'Server error') {
    super(message, 500);
  }
}

module.exports = ServerError;
