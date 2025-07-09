const apiRouter = require('express').Router();
const userRouter = require('./userRouter');
const contestRouter = require('./contestRouter');
const conversationRouter = require('./conversationRouter');
const authRouter = require('./authRouter');
const catalogRouter = require('./catalogRouter');
const offerRouter = require('./offerRouter');
const bankingRouter = require('./bankingRouter');

apiRouter.use('/users', userRouter);
apiRouter.use('/contests', contestRouter);
apiRouter.use('/conversations', conversationRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/catalogs', catalogRouter);
apiRouter.use('/offers', offerRouter);
apiRouter.use('/bankings', bankingRouter);


module.exports = apiRouter;


