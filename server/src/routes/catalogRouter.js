const catalogRouter = require('express').Router();
const CatalogController = require('../controllers/Catalog.controller');
const validators = require('../middlewares/validators');

catalogRouter.post(
  '/',
  validators.validateCatalog,
  CatalogController.createCatalog,
);

catalogRouter.get(
  '/',
  CatalogController.getCatalogs,
);

catalogRouter.put(
  '/:id',
  validators.validateCatalog,
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
