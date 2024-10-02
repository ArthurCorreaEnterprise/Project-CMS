const { User } = require("../models");
const bcrypt = require("bcrypt");
const validator = require("validator"); // Importa a biblioteca validator

exports.createUser = async (userData) => {
  // Verifica se o email é válido
  if (!validator.isEmail(userData.email)) {
    throw new Error("Email inválido.");
  }

  // Verifica se o email já está em uso
  const existingUser = await User.findOne({ where: { email: userData.email } });
  if (existingUser) {
    throw new Error("Email já está em uso.");
  }

  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;

  // Cria o novo usuário
  return await User.create(userData);
};

// Função para autenticar o usuário
exports.authenticateUser = async (email, password) => {
  const user = await db.User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  // Verifica se a senha está correta
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Credenciais inválidas.");
  }

  // Gera um token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { user, token };
};

exports.isValidEmail = (email) => {
  // Expressão regular para validar o formato do email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)$/;
  return emailPattern.test(email);
};
