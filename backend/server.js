// server.js

const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./api/routes/userRoutes");
const accessRoutes = require("./api/routes/accessRoutes");
const db = require("./api/models"); // Importar modelos

const app = express();
app.use(bodyParser.json());

// Usar rotas
app.use("/api", userRoutes);
app.use("/api", accessRoutes);

const PORT = process.env.PORT || 4000;

db.sequelize
  .sync() // Sincronizar os modelos com o banco de dados
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao sincronizar modelos:", error);
  });
