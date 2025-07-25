const Catalog = require('../models/mongoModels/Catalog');
const findAndUpdateCatalog = require('../utils/catalogUtils');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createCatalog = async (req, res, next) => {
  try {
    const catalog = await new Catalog({
      userId: req.tokenData.userId,
      catalogName: req.body.catalogName,
      chats: [req.body.chatId],
    }).save();
    res.status(201).send(catalog);
  } catch (err) {
    next (err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await Catalog.find({ userId: req.tokenData.userId }, '_id catalogName chats').lean();
    res.status(200).send(catalogs);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const catalog = await findAndUpdateCatalog({
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
    const { id, conversationId } = req.params;
    const userId = req.tokenData.userId;

    const catalog = await findAndUpdateCatalog({
      catalogId: id,
      userId,
      update: { $addToSet: { chats: conversationId } },
    });

    res.status(200).send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const { id, conversationId } = req.params;
    const userId = req.tokenData.userId;

    const catalog = await findAndUpdateCatalog({
      catalogId: id,
      userId,
      update: { $pull: { chats: conversationId } },
    });

    res.status(200).send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const result = await Catalog.deleteOne({
      _id: req.params.id,
      userId: req.tokenData.userId,
    });

    if (result.deletedCount === 0) {
      return next(new NotFoundError('Catalog not found'));
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};


