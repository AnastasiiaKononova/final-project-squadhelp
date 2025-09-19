const userRouter = require('express').Router();
const UserController = require('../controllers/User.controller');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');
const validators = require('../middlewares/validators');

userRouter.patch(
  '/:id/mark',
  basicMiddlewares.onlyForCustomer,
  UserController.changeMark,
);

userRouter.put(
  '/',
  upload.uploadAvatar,
  validators.validateUpdateUser,
  UserController.updateUser,
);

module.exports = userRouter;
