const nodemailer = require('nodemailer');

// Configurações do Nodemailer usando SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Servidor SMTP do Gmail
  port: 587, // Porta para conexão SMTP
  secure: false, // Defina como true para porta 465, caso contrário false
  auth: {
    user: 'arthurcorreaenterprise@gmail.com', // seu e-mail
    pass: 'rpqo ccgq szmv mehx',  // sua senha ou senha de aplicativo
  },
});

// Função para enviar o e-mail de confirmação
const sendConfirmationEmail = async (to, confirmationLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Confirmação de E-mail',
    text: `Por favor, clique no seguinte link para confirmar seu e-mail: ${confirmationLink}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail enviado com sucesso:", info.response);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error.message);
    throw error;  // Propaga o erro para que a função `createUser` possa lidar com ele
  }
};

module.exports = {
  sendConfirmationEmail,
};
