module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('Contests', 'contests');
    await queryInterface.renameColumn('contests', 'orderId', 'order_id');
    await queryInterface.renameColumn('contests', 'userId', 'user_id');
    await queryInterface.renameColumn('contests', 'contestType', 'contest_type');
    await queryInterface.renameColumn('contests', 'fileName', 'file_name');
    await queryInterface.renameColumn('contests', 'originalFileName', 'original_file_name');
    await queryInterface.renameColumn('contests', 'typeOfName', 'type_of_name');
    await queryInterface.renameColumn('contests', 'focusOfWork', 'focus_of_work');
    await queryInterface.renameColumn('contests', 'targetCustomer', 'target_customer');
    await queryInterface.renameColumn('contests', 'styleName', 'style_name');
    await queryInterface.renameColumn('contests', 'nameVenture', 'name_venture');
    await queryInterface.renameColumn('contests', 'typeOfTagline', 'type_of_tagline');
    await queryInterface.renameColumn('contests', 'brandStyle', 'brand_style');
    await queryInterface.renameColumn('contests', 'createdAt', 'created_at');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('contests', 'order_id', 'orderId');
    await queryInterface.renameColumn('contests', 'user_id', 'userId');
    await queryInterface.renameColumn('contests', 'contest_type', 'contestType');
    await queryInterface.renameColumn('contests', 'file_name', 'fileName');
    await queryInterface.renameColumn('contests', 'original_file_name', 'originalFileName');
    await queryInterface.renameColumn('contests', 'type_of_name', 'typeOfName');
    await queryInterface.renameColumn('contests', 'focus_of_work', 'focusOfWork');
    await queryInterface.renameColumn('contests', 'target_customer', 'targetCustomer');
    await queryInterface.renameColumn('contests', 'style_name', 'styleName');
    await queryInterface.renameColumn('contests', 'name_venture', 'nameVenture');
    await queryInterface.renameColumn('contests', 'type_of_tagline', 'typeOfTagline');
    await queryInterface.renameColumn('contests', 'brand_style', 'brandStyle');
    await queryInterface.renameColumn('contests', 'created_at', 'createdAt');
    await queryInterface.renameTable('contests', 'Contests');
  },
};
