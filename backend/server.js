const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); // Permite requisições de diferentes origens
app.use(express.json()); // Faz o parser de JSON no corpo das requisições

// Rotas principais (ainda não implementadas)
app.get("/", (req, res) => {
  res.send("Servidor Express está funcionando!");
});

// Levanta o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
