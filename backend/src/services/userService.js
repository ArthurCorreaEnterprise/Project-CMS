const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailService = require("./emailService"); // Importar o serviço de e-mail

const allowedDomains = ["gmail.com", "hotmail.com", "yahoo.com"];

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  const domain = email.split("@")[1];
  if (!allowedDomains.includes(domain)) {
    throw new Error("Email domain not allowed");
  }
};

const checkIfEmailExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    throw new Error("Email already exists");
  }
};

const createUser = async (userData) => {
  const { name, email, password, access_id, privacyPolicy } = userData;

  // Valida o formato do email e verifica se já existe
  validateEmail(email);
  await checkIfEmailExists(email);

  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar um link de confirmação
  const confirmationLink = `http://localhost:4000/api/confirm-email?email=${email}`;

  try {
    // Tente enviar o e-mail antes de salvar o usuário
    await emailService.sendConfirmationEmail(email, confirmationLink);

    // Se o e-mail for enviado com sucesso, crie o usuário
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      access_id,
      privacyPolicy,
    });

    return user;

  } catch (error) {
    // Verifica se o erro foi no envio de e-mail
    if (error.message.includes('Invalid login') || error.message.includes('Invalid recipient')) {
      throw new Error("Erro: O e-mail fornecido é inválido ou inexistente.");
    } else {
      throw new Error("Erro ao enviar e-mail de confirmação: " + error.message);
    }
  }
};


// Função de autenticação
const authenticateUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Senha inválida");
  }

  // Gerar token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h", // O token expira em 1 hora
    }
  );

  return { token, user };
};

const getUsers = async () => {
  const users = await User.findAll();
  return users;
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("Usuário não encontrado");
  }
  await user.destroy();
};

module.exports = {
  createUser,
  authenticateUser,
  getUsers,
  deleteUser,
};
