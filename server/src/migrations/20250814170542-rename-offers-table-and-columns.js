module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('Offers', 'offers');
    await queryInterface.renameColumn('offers', 'userId', 'user_id');
    await queryInterface.renameColumn('offers', 'contestId', 'contest_id');
    await queryInterface.renameColumn('offers', 'fileName', 'file_name');
    await queryInterface.renameColumn('offers', 'originalFileName', 'original_file_name');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('offers', 'user_id', 'userId');
    await queryInterface.renameColumn('offers', 'contest_id', 'contestId');
    await queryInterface.renameColumn('offers', 'file_name', 'fileName');
    await queryInterface.renameColumn('offers', 'original_file_name', 'originalFileName');
    await queryInterface.renameTable('offers', 'Offers');
  },
};
