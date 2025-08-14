const contestPropertiesQueries = require ('./queries/contestPropertiesQueries');
const ServerError =require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');


module.exports.dataForContest = async (req, res, next) => {
  const response = {};
  try {
    const { characteristic1, characteristic2 } = req.query;

    const types = [characteristic1, characteristic2, 'industry'].filter(Boolean);

    const characteristics = await contestPropertiesQueries.getCharacteristicsByTypes(types);
    if (!characteristics || characteristics.length === 0) {
      throw new NotFoundError('No characteristics found');
    }
    characteristics.forEach(characteristic => {
      if (!response[ characteristic.type ]) {
        response[ characteristic.type ] = [];
      }
      response[ characteristic.type ].push(characteristic.describe);
    });
    res.status(200).send(response);
  } catch (err) {
    next(new ServerError(err.message));
  }
};
