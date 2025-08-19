const { Model } = require('sequelize');
const { contestScopes } = require('./scopes/ContestScopes');

module.exports = (sequelize, DataTypes) => {
  class Contest extends Model {

    static associate(models) {
      Contest.belongsTo(models.User,  { foreignKey: 'userId', sourceKey: 'id' });
      Contest.hasMany(models.Offer, { foreignKey: 'contestId', targetKey: 'id' });
    }
  }
  Contest.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    orderId: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'order_id',
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      field: 'user_id',
    },
    contestType: {
      allowNull: false,
      type: DataTypes.ENUM('name', 'tagline', 'logo'),
      field: 'contest_type',
    },
    fileName: {
      allowNull: true,
      type: DataTypes.STRING,
      field: 'file_name',
    },
    originalFileName: {
      allowNull: true,
      type: DataTypes.STRING,
      field: 'original_file_name',
    },
    title: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    typeOfName: {
      allowNull: true,
      type: DataTypes.STRING,
      field: 'type_of_name',
    },
    industry: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    focusOfWork: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: 'focus_of_work',
    },
    targetCustomer: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: 'target_customer',
    },
    styleName: {
      allowNull: true,
      type: DataTypes.STRING,
      field: 'style_name',
    },
    nameVenture: {
      allowNull: true,
      type: DataTypes.STRING,
      field: 'name_venture',
    },
    typeOfTagline: {
      allowNull: true,
      type: DataTypes.STRING,
      field: 'type_of_tagline',
    },
    brandStyle: {
      allowNull: true,
      type: DataTypes.STRING,
      field: 'brand_style',
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.STRING,
      field: 'created_at',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prize: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    priority: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },

  }, {
    sequelize,
    modelName: 'Contest',
    tableName: 'contests',
    underscored: false,
    timestamps: false,
    scopes: contestScopes,
  });
  return Contest;
};
