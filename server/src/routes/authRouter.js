const authRouter = require('express').Router();
const validators = require('../middlewares/validators');
const checkToken = require('../middlewares/checkToken');
const hashPass = require('../middlewares/hashPassMiddle');
const UserController = require('../controllers/User.controller');

authRouter.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  UserController.registration,
);

authRouter.get(
  '/me',
  checkToken.checkAuth,
);

authRouter.post(
  '/login',
  validators.validateLogin,
  UserController.login,
);


module.exports = authRouter;