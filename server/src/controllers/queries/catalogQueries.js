const { Catalog } = require('../../models/mongoModels');
const NotFoundError = require('../../errors/NotFoundError');

module.exports.createCatalog = async ({ userId, catalogName, chatId }) => {
  return await new Catalog({
    userId,
    catalogName,
    chats: [chatId],
  }).save();
};

module.exports.getCatalogsByUserid = async (userId) => {
  return await Catalog.find({ userId }, '_id catalogName chats').lean();
};

const findAndUpdateCatalog = async ({ catalogId, userId, update }) => {
  const catalog = await Catalog.findOneAndUpdate(
    { _id: catalogId, userId },
    update,
    { new: true },
  );
  if (!catalog) {
    throw new NotFoundError('Catalog not found');
  }
  return catalog;
};

module.exports.findAndUpdateCatalog = findAndUpdateCatalog;

module.exports.addNewChatToCatalog = async ({ catalogId, userId, conversationId }) => {
  return await findAndUpdateCatalog({
    catalogId,
    userId,
    update: { $addToSet: { chats: conversationId } },
  });
};

module.exports.removeChatFromCatalog = async ({ catalogId, userId, conversationId }) => {
  return await findAndUpdateCatalog({
    catalogId,
    userId,
    update: { $pull: { chats: conversationId } },
  });
};

module.exports.deleteCatalogById = async ({ catalogId, userId }) => {
  const result = await Catalog.deleteOne({ _id: catalogId, userId });
  if (result.deletedCount === 0) {
    throw new NotFoundError('Catalog not found');
  }
};
