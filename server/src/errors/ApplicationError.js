class ApplicationError extends Error {
  constructor(message = 'Something went wrong. Please try again', code = 500) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.code = code;
  }
}

module.exports = ApplicationError;
