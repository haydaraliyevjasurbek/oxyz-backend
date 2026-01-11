'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QuoteForm extends Model {
    static associate(models) {
      // no associations
    }
  }

  QuoteForm.init(
    {
      fromLabel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fromDefault: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      cargoLabel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cargoDefault: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      toLabel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      toDefault: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      weightLabel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weightDefault: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      transportLabel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transportDefault: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      calculateText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'QuoteForm',
    }
  );

  return QuoteForm;
};
