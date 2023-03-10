'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notifications.belongsTo(models.Status,{foreignKey:'statusId'});
      Notifications.belongsTo(models.User,{as:'notificationSender',foreignKey:'followerId'})
      Notifications.belongsTo(models.User,{as:'notificationReceiver',foreignKey:'followedId'})

    }
  }
  Notifications.init({
  }, {
    sequelize,
    modelName: 'Notifications',
  });
  Notifications.removeAttribute('id');
  return Notifications;
};