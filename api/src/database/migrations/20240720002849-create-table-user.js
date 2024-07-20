"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      idUser: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
        field: "id_user",
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "first_name",
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "last_name",
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "email",
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "password",
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
    await queryInterface.dropTable("user");
  },
};
