const catalogRouter = require('express').Router();
const CatalogController = require('../controllers/Catalog.controller');

catalogRouter.post(
  '/',
  CatalogController.createCatalog,
);

catalogRouter.get(
  '/',
  CatalogController.getCatalogs,
);

catalogRouter.put(
  '/:id',
  CatalogController.updateNameCatalog,
);

catalogRouter.post(
  '/:id/conversations/:conversationId',
  CatalogController.addNewChatToCatalog,
);

catalogRouter.delete(
  '/:id/conversations/:conversationId',
  CatalogController.removeChatFromCatalog,
);

catalogRouter.delete(
  '/:id',
  CatalogController.deleteCatalog,
);

module.exports = catalogRouter;
