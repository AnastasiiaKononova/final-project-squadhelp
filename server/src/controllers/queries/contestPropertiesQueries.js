const db = require('../../models');
const { Op } = db.Sequelize;

module.exports.getCharacteristicsByTypes = async (types) => {
  return db.Selects.findAll({
    where: {
      type: {
        [Op.in]: types,
      },
    },
  });
};
