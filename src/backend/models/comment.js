'use strict';
const { Model, DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  class Comment extends Model {
    static associate(models) {}
  }

  Comment.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });

  return Comment;
};
