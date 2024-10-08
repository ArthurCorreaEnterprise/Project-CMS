const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");
const pgtools = require("pgtools"); // Importar pgtools
const routes = require("./src/routes");
const path = require("path");

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Configurando middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Middleware para servir arquivos estáticos
app.use(express.json()); // Middleware para interpretar JSON
app.use(cookieParser()); // Middleware para manipular cookies
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Configurações de CORS

// Configurações do banco de dados
const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  port: 5432,
};
const databaseName = process.env.DB_NAME;

// Função para criar banco de dados se não existir
const createDatabaseIfNotExists = async () => {
  try {
    await pgtools.createdb(config, databaseName);
    console.log("Banco de dados criado com sucesso");
  } catch (err) {
    if (err.name === "duplicate_database") {
      console.log("Banco de dados já existe, continuando...");
    } else {
      console.error("Erro ao criar o banco de dados:", err);
      process.exit(-1); // Encerra o processo se for outro erro
    }
  }
};

// Criar o banco de dados e continuar com a configuração
createDatabaseIfNotExists().then(() => {
  // Configurando o Sequelize
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: "postgres",
    }
  );

  // Testando a conexão com o banco de dados
  sequelize
    .authenticate()
    .then(() => {
      console.log("Conexão com o banco de dados estabelecida com sucesso.");

      // Sincronizando os modelos
      sequelize
        .sync({ force: false }) // Alterar para true se quiser recriar tabelas (não recomendado para produção)
        .then(() => {
          console.log("Modelos sincronizados com sucesso.");

          // Inicializando o servidor
          app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
          });
        })
        .catch((syncError) => {
          console.error("Erro ao sincronizar os modelos:", syncError);
        });
    })
    .catch((err) => {
      console.error("Erro ao conectar no banco de dados:", err);
    });
});

// Usando o índice de rotas
app.use("/api", routes);

// Rota simples de teste
app.get("/", (req, res) => {
  res.send("Bem-vindo ao Project-CMS Backend!");
});
