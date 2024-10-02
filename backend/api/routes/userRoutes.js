const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); // Importando o middleware
const router = express.Router();

// Rota para registrar um novo usuário
router.post('/users/register', userController.registerUser);

// Rota para autenticar um usuário
router.post('/users/login', userController.loginUser);

// Exemplo de rota protegida
router.get('/users/profile', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Perfil do usuário', userId: req.userId });
});

module.exports = router;
