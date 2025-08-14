module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('Ratings', 'ratings');
    await queryInterface.renameColumn('ratings', 'offerId', 'offer_id');
    await queryInterface.renameColumn('ratings', 'userId', 'user_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('ratings', 'offer_id', 'offerId');
    await queryInterface.renameColumn('ratings', 'user_id', 'userId');
    await queryInterface.renameTable('ratings', 'Ratings');
  },
};
