'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, { foreignKey: 'roleId' });
      User.hasMany(models.Follow);
      User.hasMany(models.Chat, {as:'sender',foreignKey: 'senderId'});
      User.hasMany(models.Chat, {as:'receiver',foreignKey: 'receiverId'});
      User.hasMany(models.Notifications,{as:'notificationFollower', foreignKey:'followerId'})
      User.hasMany(models.Notifications,{as:'notificationFollowed',foreignKey:'followedId'})
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};