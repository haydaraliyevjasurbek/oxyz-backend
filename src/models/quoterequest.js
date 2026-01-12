'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QuoteRequest extends Model {
    static associate(models) {
      // no associations for now
    }
  }

  QuoteRequest.init(
    {
      from: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      to: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cargo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transport: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'QuoteRequest',
    }
  );

  return QuoteRequest;
};
