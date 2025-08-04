const contestRouter = require('express').Router();
const ContestController = require('../controllers/Contest.controller');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');

contestRouter.get(
  '/',
  basicMiddlewares.onlyForCreative,
  ContestController.getContests,
);

contestRouter.get(
  '/customer',
  ContestController.getCustomersContests,
);

contestRouter.get(
  '/file/:fileName',
  ContestController.downloadFile,
);

contestRouter.get(
  '/:id',
  basicMiddlewares.canGetContest,
  ContestController.getContestById,
);

contestRouter.put(
  '/:id',
  upload.updateContestFile,
  ContestController.updateContest,
);

module.exports = contestRouter;
