module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('Banks', 'banks');
    await queryInterface.renameColumn('banks', 'cardNumber', 'card_number');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('banks', 'card_number', 'cardNumber');
    await queryInterface.renameTable('banks', 'Banks');
  },
};
