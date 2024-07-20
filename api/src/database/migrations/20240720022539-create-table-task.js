"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("task", {
      idTask: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
        field: "id_task",
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      idUser: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "id_user",
        references: {
          model: "user",
          key: "id_user",
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updated_at",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("task");
  },
};
