const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {

    static associate(models) {
      Offer.belongsTo(models.User, { foreignKey: 'userId', sourceKey: 'id' });
      Offer.belongsTo(models.Contest, { foreignKey: 'contestId', sourceKey: 'id' });
      Offer.hasOne(models.Rating, { foreignKey: 'offerId', targetKey: 'id' });
    }
  }
  Offer.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    contestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'contest_id',
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'file_name',
    },
    originalFileName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'original_file_name',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'pending',
    },
  }, {
    sequelize,
    modelName: 'Offer',
    tableName: 'offers',
    underscored: false,
    timestamps: false,
  });
  return Offer;
};
