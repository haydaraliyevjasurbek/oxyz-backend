'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Stat extends Model {
    static associate(models) {
      // define association here
    }
  }

  Stat.init(
    {
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      icon: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
      },
      iconMimeType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Stat',
    }
  );

  return Stat;
};
