'use strict';
const { Model, DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  class Photo extends Model {
    static associate(models) {
      Photo.hasMany(models.Comment, {
        foreignKey: 'photoId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Photo.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Photo.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      imageData: DataTypes.BLOB,
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Photo',
    }
  );

  return Photo;
};
