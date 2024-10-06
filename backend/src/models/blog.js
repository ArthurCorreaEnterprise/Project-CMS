"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      Blog.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
      Blog.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
  }
  Blog.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT, // Mudado para TEXT para suportar textos longos
        allowNull: false,
      },
      cover: {
        type: DataTypes.STRING, // Pode ser mantido como STRING ou TEXT, dependendo da URL da imagem
        allowNull: true,
      },
      views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Certifique-se de que isso é não nulo se for um campo obrigatório
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // O ID do usuário não pode ser nulo
      },
    },
    {
      sequelize,
      modelName: "Blog",
    }
  );
  return Blog;
};
