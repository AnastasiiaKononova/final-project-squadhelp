module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('Users', 'users');
    await queryInterface.renameColumn('users', 'firstName', 'first_name');
    await queryInterface.renameColumn('users', 'lastName', 'last_name');
    await queryInterface.renameColumn('users', 'displayName', 'display_name');
    await queryInterface.renameColumn('users', 'accessToken', 'access_token');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('users', 'first_name', 'firstName');
    await queryInterface.renameColumn('users', 'last_name', 'lastName');
    await queryInterface.renameColumn('users', 'display_name', 'displayName');
    await queryInterface.renameColumn('users', 'access_token', 'accessToken');
    await queryInterface.renameTable('users', 'Users');
  },
};
