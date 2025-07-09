const userRouter = require('express').Router();
const UserController = require('../controllers/User.controller');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const checkToken = require('../middlewares/checkToken');
const upload = require('../utils/fileUpload');

userRouter.patch(
  '/:id/mark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  UserController.changeMark,
);

userRouter.put(
  '/',
  checkToken.checkToken,
  upload.uploadAvatar,
  UserController.updateUser,
);
  
module.exports = userRouter;