const ApplicationError = require('./ApplicationError');

class NotUniqueEmailError extends ApplicationError {
  constructor(message = 'This email already exists') {
    super(message, 409);
  }
}

module.exports = NotUniqueEmailError;
