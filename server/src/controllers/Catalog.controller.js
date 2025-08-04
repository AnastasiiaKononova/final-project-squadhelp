const catalogQueries = require('./queries/catalogQueries');

module.exports.createCatalog = async (req, res, next) => {
  try {
    const catalog = await catalogQueries.createCatalog({
      userId: req.tokenData.userId,
      catalogName: req.body.catalogName,
      chats: [req.body.chatId],
    });
    res.status(201).send(catalog);
  } catch (err) {
    next (err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await catalogQueries.getCatalogsByUserid(req.tokenData.userId);
    res.status(200).send(catalogs);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const catalog = await catalogQueries.findAndUpdateCatalog({
      catalogId: req.params.id,
      userId: req.tokenData.userId,
      update: { catalogName: req.body.catalogName },
    });
    res.status(200).send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const catalog = await catalogQueries.addNewChatToCatalog({
      catalogId: req.params.id,
      userId: req.tokenData.userId,
      conversationId: req.params.conversationId,
    });
    res.status(200).send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const catalog = await catalogQueries.removeChatFromCatalog({
      catalogId: req.params.id,
      userId: req.tokenData.userId,
      conversationId: req.params.conversationId,
    });
    res.status(200).send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    await catalogQueries.deleteCatalogById({
      catalogId: req.params.id,
      userId: req.tokenData.userId,
    });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};


