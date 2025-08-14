const conversationRouter = require('express').Router();
const ConversationController = require('../controllers/Conversation.controller');
const validators = require('../middlewares/validators');

conversationRouter.post(
  '/messages',
  validators.validateMessageBody,
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
