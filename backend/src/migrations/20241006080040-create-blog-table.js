"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Blogs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT, // Altere para TEXT para suportar conteúdo maior, como HTML
        allowNull: false,
      },
      cover: {
        type: Sequelize.STRING, // Pode ser mantido como STRING ou TEXT, dependendo do tamanho da URL da imagem
        allowNull: true,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false, // Certifique-se de que isso é não nulo se for um campo obrigatório
        references: {
          model: "Categories", // Nome da tabela referenciada
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // Ajustado para "SET NULL" para evitar a exclusão de blogs se a categoria for removida
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Nome da tabela referenciada
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // Ajustado para "SET NULL" para evitar a exclusão de blogs se o usuário for removido
      },
      views: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Blogs");
  },
};
