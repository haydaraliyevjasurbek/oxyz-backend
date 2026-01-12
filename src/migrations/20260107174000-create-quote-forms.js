'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('QuoteForms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      onlineHint: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      fromLabel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fromPlaceholder: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fromDefault: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      cargoLabel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cargoPlaceholder: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cargoDefault: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      nameLabel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      namePlaceholder: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nameDefault: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      toLabel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      toPlaceholder: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      toDefault: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      weightLabel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      weightPlaceholder: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      weightDefault: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      phoneLabel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phonePlaceholder: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneDefault: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      transportLabel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      transportPlaceholder: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      transportDefault: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      nextText: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      calculateText: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      summaryLocationLabel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      summaryCargoLabel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      summaryCustomerLabel: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('QuoteForms');
  },
};
