require('dotenv').config(); // Adicione esta linha no topo do arquivo

const express = require('express');
const db = require('./api/models');

const app = express();
const PORT = process.env.PORT || 4000;

// Teste a conexão com o banco de dados
db.sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
