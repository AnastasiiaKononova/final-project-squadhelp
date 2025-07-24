const contestRouter = require('express').Router();
const ContestController = require('../controllers/Contest.controller');
const checkToken = require('../middlewares/checkToken');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');

contestRouter.get(
  '/',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  ContestController.getContests,
);

contestRouter.get(
  '/characteristics',
  checkToken.checkToken,
  ContestController.dataForContest,
);

contestRouter.get(
  '/customer',
  checkToken.checkToken,
  ContestController.getCustomersContests,
);

contestRouter.get(
  '/file/:fileName',
  checkToken.checkToken,
  ContestController.downloadFile,
);

contestRouter.get(
  '/:id',
  checkToken.checkToken,
  basicMiddlewares.canGetContest,
  ContestController.getContestById,
);

contestRouter.put(
  '/:id',
  checkToken.checkToken,
  upload.updateContestFile,
  ContestController.updateContest,
);

module.exports = contestRouter;
