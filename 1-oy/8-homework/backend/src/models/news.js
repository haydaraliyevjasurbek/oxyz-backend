'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      // define association here
    }
  }

  News.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      publishedAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      image: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
      },
      imageMimeType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'News',
    }
  );

  return News;
};
