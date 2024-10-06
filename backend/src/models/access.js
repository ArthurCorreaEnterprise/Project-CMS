"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Access extends Model {
    static associate(models) {
      Access.hasMany(models.User, { foreignKey: "access_id", as: "user" });
    }
  }

  Access.init(
    {
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Access",
    }
  );
  return Access;
};
