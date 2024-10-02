const { Sequelize } = require('sequelize'); // Adicione esta linha
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Aqui você pode adicionar seus modelos
// Exemplo: db.User = require('./User')(sequelize, Sequelize);

module.exports = db;
