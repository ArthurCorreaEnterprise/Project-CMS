// api/controllers/userController.js

const db = require('../models');

exports.listUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    return res.json(users);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    return res.status(500).json({ error: 'Erro ao listar usuários.' });
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password, access_id } = req.body;

  try {
    const user = await db.User.create({ name, email, password, access_id });
    return res.status(201).json(user);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
};
