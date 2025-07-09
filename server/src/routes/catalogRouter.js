const catalogRouter = require('express').Router();
const checkToken = require('../middlewares/checkToken');
const ConversationController = require('../controllers/Conversation.controller');

catalogRouter.post(
  '/',
  checkToken.checkToken,
  ConversationController.createCatalog,
);

catalogRouter.put(
  '/:id',
  checkToken.checkToken,
  ConversationController.updateNameCatalog,
);

catalogRouter.post(
  '/:id/conversations/:conversationId',
  checkToken.checkToken,
  ConversationController.addNewChatToCatalog,
);

catalogRouter.delete(
  '/:id/conversations/:conversationId',
  checkToken.checkToken,
  ConversationController.removeChatFromCatalog,
);

catalogRouter.delete(
  '/:id',
  checkToken.checkToken,
  ConversationController.deleteCatalog,
);

catalogRouter.get(
  '/',
  checkToken.checkToken,
  ConversationController.getCatalogs,
);

module.exports = catalogRouter;