const { Sequelize } = require('sequelize');

// Crie uma instância do Sequelize com as credenciais do banco de dados
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

module.exports = sequelize;
