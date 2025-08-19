module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('Selects', 'selects');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('selects', 'Selects');
  },
};
