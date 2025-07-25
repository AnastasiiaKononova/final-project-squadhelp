const userRouter = require('express').Router();
const UserController = require('../controllers/User.controller');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');

userRouter.patch(
  '/:id/mark',
  basicMiddlewares.onlyForCustomer,
  UserController.changeMark,
);

userRouter.put(
  '/',
  upload.uploadAvatar,
  UserController.updateUser,
);

module.exports = userRouter;
