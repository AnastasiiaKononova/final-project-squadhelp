const conversationRouter = require('express').Router();
const ConversationController = require('../controllers/Conversation.controller');
const checkToken = require('../middlewares/checkToken');

conversationRouter.post(
  '/messages',
  checkToken.checkToken,
  ConversationController.addMessage,
);

conversationRouter.get(
  '/preview',
  checkToken.checkToken,
  ConversationController.getPreview,
);

conversationRouter.get(
  '/:interlocutorId',
  checkToken.checkToken,
  ConversationController.getChat,
);

conversationRouter.patch(
  '/blacklist',
  checkToken.checkToken,
  ConversationController.blackList,
);

conversationRouter.patch(
  '/favorite',
  checkToken.checkToken,
  ConversationController.favoriteChat,
);

module.exports = conversationRouter;
