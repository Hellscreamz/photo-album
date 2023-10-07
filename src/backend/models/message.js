'use strict';
const { Model, DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  class Message extends Model {}

  Message.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Message',
    }
  );

  return Message;
};
