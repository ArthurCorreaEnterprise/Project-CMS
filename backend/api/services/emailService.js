// api/services/emailService.js
const transporter = require('../config/emailConfig');

const sendEmail = async (to, subject, text, html) => {
    const mailOptions = {
        from: 'your-email@example.com', // Remetente
        to, // Destinatário
        subject, // Assunto
        text, // Texto simples
        html, // HTML do e-mail
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado:', info.response);
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        throw error; // Propaga o erro para tratamento
    }
};

module.exports = {
    sendEmail,
};
