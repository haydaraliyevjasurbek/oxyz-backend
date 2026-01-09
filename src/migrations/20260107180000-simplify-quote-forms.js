'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Drop unused fields for the simplified Quote Form UI
    await queryInterface.removeColumn('QuoteForms', 'onlineHint');

    await queryInterface.removeColumn('QuoteForms', 'fromPlaceholder');
    await queryInterface.removeColumn('QuoteForms', 'cargoPlaceholder');
    await queryInterface.removeColumn('QuoteForms', 'nameLabel');
    await queryInterface.removeColumn('QuoteForms', 'namePlaceholder');
    await queryInterface.removeColumn('QuoteForms', 'nameDefault');
    await queryInterface.removeColumn('QuoteForms', 'toPlaceholder');
    await queryInterface.removeColumn('QuoteForms', 'weightPlaceholder');
    await queryInterface.removeColumn('QuoteForms', 'phoneLabel');
    await queryInterface.removeColumn('QuoteForms', 'phonePlaceholder');
    await queryInterface.removeColumn('QuoteForms', 'phoneDefault');
    await queryInterface.removeColumn('QuoteForms', 'transportPlaceholder');

    await queryInterface.removeColumn('QuoteForms', 'nextText');

    await queryInterface.removeColumn('QuoteForms', 'summaryLocationLabel');
    await queryInterface.removeColumn('QuoteForms', 'summaryCargoLabel');
    await queryInterface.removeColumn('QuoteForms', 'summaryCustomerLabel');

    // Ensure required columns remain required
    await queryInterface.changeColumn('QuoteForms', 'fromLabel', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('QuoteForms', 'toLabel', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('QuoteForms', 'cargoLabel', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('QuoteForms', 'weightLabel', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('QuoteForms', 'transportLabel', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('QuoteForms', 'calculateText', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Re-add removed columns (best-effort rollback)
    await queryInterface.addColumn('QuoteForms', 'onlineHint', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Или напишите, мы онлайн',
    });

    await queryInterface.addColumn('QuoteForms', 'fromPlaceholder', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Или напишите, мы онлайн',
    });

    await queryInterface.addColumn('QuoteForms', 'cargoPlaceholder', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Или напишите, мы онлайн',
    });

    await queryInterface.addColumn('QuoteForms', 'nameLabel', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Имя',
    });

    await queryInterface.addColumn('QuoteForms', 'namePlaceholder', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Введите ваше имя',
    });

    await queryInterface.addColumn('QuoteForms', 'nameDefault', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('QuoteForms', 'toPlaceholder', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Или напишите, мы онлайн',
    });

    await queryInterface.addColumn('QuoteForms', 'weightPlaceholder', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Или напишите, мы онлайн',
    });

    await queryInterface.addColumn('QuoteForms', 'phoneLabel', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Номер телефона',
    });

    await queryInterface.addColumn('QuoteForms', 'phonePlaceholder', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '+998',
    });

    await queryInterface.addColumn('QuoteForms', 'phoneDefault', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('QuoteForms', 'transportPlaceholder', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Или напишите, мы онлайн',
    });

    await queryInterface.addColumn('QuoteForms', 'nextText', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Далее',
    });

    await queryInterface.addColumn('QuoteForms', 'summaryLocationLabel', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Локация',
    });

    await queryInterface.addColumn('QuoteForms', 'summaryCargoLabel', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Груз',
    });

    await queryInterface.addColumn('QuoteForms', 'summaryCustomerLabel', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Заказчик',
    });
  },
};
