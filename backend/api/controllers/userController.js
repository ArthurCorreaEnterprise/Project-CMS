const userService = require('../services/userService');
const emailService = require('../services/emailService');

// Função para validar o formato do email
const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)$/;
    return emailPattern.test(email);
};

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Verificar se o email é válido
  if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Email deve ser um endereço válido (gmail.com, hotmail.com, yahoo.com, outlook.com).' });
  }

  const subject = 'Verifique seu e-mail';
  const text = 'Por favor, clique no link abaixo para verificar seu e-mail.';
  const html = `<h1>Verifique seu e-mail</h1><p>Por favor, clique no link abaixo para verificar seu e-mail.</p>`;

  try {
      // Enviar e-mail de verificação
      const emailResponse = await emailService.sendEmail(email, subject, text, html);
      console.log('E-mail enviado com sucesso:', emailResponse); // Log da resposta do e-mail

      // Se o e-mail for enviado com sucesso, criar o usuário
      const user = await userService.createUser(req.body);

      res.status(201).json({ message: 'Usuário registrado com sucesso.', user });
  } catch (error) {
      console.error('Erro ao enviar e-mail:', error); // Log do erro
      return res.status(400).json({ error: 'Erro ao enviar e-mail de verificação. Cadastro não concluído.' });
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
