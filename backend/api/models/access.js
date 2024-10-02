// api/models/access.js

module.exports = (sequelize, DataTypes) => {
  const Access = sequelize.define('Access', {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'accesses', // Nome da tabela no banco de dados
  });

  Access.associate = (models) => {
    Access.hasMany(models.User, { foreignKey: 'access_id' });
  };

  return Access;
};
