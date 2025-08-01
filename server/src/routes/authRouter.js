const authRouter = require('express').Router();
const validators = require('../middlewares/validators');
const hashPass = require('../middlewares/hashPassMiddle');
const AuthController = require('../controllers/Auth.controller');
const checkToken = require('../middlewares/checkToken');

authRouter.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  AuthController.registration,
);

authRouter.get(
  '/me',
  checkToken,
  AuthController.me,
);

authRouter.post(
  '/login',
  validators.validateLogin,
  AuthController.login,
);

module.exports = authRouter;
