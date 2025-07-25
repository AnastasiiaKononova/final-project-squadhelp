const Catalog = require('../models/mongoModels/Catalog');
const NotFoundError = require('../errors/NotFoundError');

module.exports = async function findAndUpdateCatalog ({ catalogId, userId, update }) {
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
