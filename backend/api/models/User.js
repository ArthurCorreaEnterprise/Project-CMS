// api/models/user.js

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    access_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'users', // Nome da tabela no banco de dados
  });

  User.associate = (models) => {
    User.belongsTo(models.Access, { foreignKey: 'access_id' });
  };

  return User;
};
