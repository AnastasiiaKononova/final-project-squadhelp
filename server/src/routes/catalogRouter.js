const catalogRouter = require('express').Router();
const checkToken = require('../middlewares/checkToken');
const CatalogController = require('../controllers/Catalog.controller');

catalogRouter.post(
  '/',
  checkToken.checkToken,
  CatalogController.createCatalog,
);

catalogRouter.get(
  '/',
  checkToken.checkToken,
  CatalogController.getCatalogs,
);

catalogRouter.put(
  '/:id',
  checkToken.checkToken,
  CatalogController.updateNameCatalog,
);

catalogRouter.post(
  '/:id/conversations/:conversationId',
  checkToken.checkToken,
  CatalogController.addNewChatToCatalog,
);

catalogRouter.delete(
  '/:id/conversations/:conversationId',
  checkToken.checkToken,
  CatalogController.removeChatFromCatalog,
);

catalogRouter.delete(
  '/:id',
  checkToken.checkToken,
  CatalogController.deleteCatalog,
);

module.exports = catalogRouter;
