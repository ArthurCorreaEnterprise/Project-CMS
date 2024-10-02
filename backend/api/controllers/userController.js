const userService = require('../services/userService');

// Função para registrar um novo usuário
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Verificar se o email é válido
  if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Email deve ser um endereço válido (gmail.com, hotmail.com, yahoo.com, outlook.com).' });
  }

  try {
      const user = await userService.createUser(req.body);
      res.status(201).json({ message: 'Usuário registrado com sucesso.', user });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

// Função para autenticar o usuário
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      const { user, token } = await userService.authenticateUser(email, password);
      return res.status(200).json({ user, token });
  } catch (error) {
      console.error('Erro na autenticação:', error.message);
      return res.status(401).json({ error: 'Credenciais inválidas.' });
  }
};
