const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.Offer, { foreignKey: 'user_id', targetKey: 'id' });
      User.hasMany(models.Contest, { foreignKey: 'userId', targetKey: 'id' });
      User.hasMany(models.Rating,  { foreignKey: 'userId', targetKey: 'id' });
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'last_name',
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'display_name',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'anon.png',
    },
    role: {
      type: DataTypes.ENUM('customer', 'creator'),
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'access_token',
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },

  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: false,
    timestamps: false,
  });
  return User;
};
