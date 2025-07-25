const conversationRouter = require('express').Router();
const ConversationController = require('../controllers/Conversation.controller');

conversationRouter.post(
  '/messages',
  ConversationController.addMessage,
);

conversationRouter.get(
  '/preview',
  ConversationController.getPreview,
);

conversationRouter.get(
  '/:interlocutorId',
  ConversationController.getChat,
);

conversationRouter.patch(
  '/blacklist',
  ConversationController.blackList,
);

conversationRouter.patch(
  '/favorite',
  ConversationController.favoriteChat,
);

module.exports = conversationRouter;
