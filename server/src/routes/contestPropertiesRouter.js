const contestPropertiesRouter = require('express').Router();
const ContestPropertiesController = require('../controllers/ContestProperties.controller');

contestPropertiesRouter.get(
  '/characteristic',
  ContestPropertiesController.dataForContest,
);

module.exports = contestPropertiesRouter;
