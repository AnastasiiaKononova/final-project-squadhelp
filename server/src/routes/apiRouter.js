const apiRouter = require('express').Router();
const checkToken = require('../middlewares/checkToken');
const userRouter = require('./userRouter');
const contestRouter = require('./contestRouter');
const conversationRouter = require('./conversationRouter');
const authRouter = require('./authRouter');
const catalogRouter = require('./catalogRouter');
const offerRouter = require('./offerRouter');
const bankingRouter = require('./bankingRouter');
const contestPropertiesRouter = require('./contestPropertiesRouter');

apiRouter.use('/auth', authRouter);

apiRouter.use(checkToken);

apiRouter.use('/users', userRouter);
apiRouter.use('/contests', contestRouter);
apiRouter.use('/conversations', conversationRouter);
apiRouter.use('/catalogs', catalogRouter);
apiRouter.use('/offers', offerRouter);
apiRouter.use('/bankings', bankingRouter);
apiRouter.use('/contests-properties', contestPropertiesRouter);

module.exports = apiRouter;


