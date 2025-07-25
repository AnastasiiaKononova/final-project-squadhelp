const authRouter = require('express').Router();
const validators = require('../middlewares/validators');
const hashPass = require('../middlewares/hashPassMiddle');
const AuthController = require('../controllers/Auth.controller');

authRouter.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  AuthController.registration,
);

authRouter.get(
  '/me',
  AuthController.me,
);

authRouter.post(
  '/login',
  validators.validateLogin,
  AuthController.login,
);

module.exports = authRouter;
