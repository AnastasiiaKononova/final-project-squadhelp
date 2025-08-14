const { v4: uuid } = require('uuid');
const moment = require('moment');

function calculatePrize(totalPrice, contestsCount, index) {
  const base = totalPrice / contestsCount;
  return index === contestsCount - 1 ? Math.ceil(base) : Math.floor(base);
}

function generateOrder() {
  return {
    orderId: uuid(),
    createdAt: moment().format('YYYY-MM-DD HH:mm'),
  };
}

module.exports = {
  calculatePrize,
  generateOrder,
};
