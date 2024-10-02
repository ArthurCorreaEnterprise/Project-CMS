// api/controllers/accessController.js

const db = require('../models');

exports.listAccess = async (req, res) => {
  try {
    const access = await db.Access.findAll();
    return res.json(access);
  } catch (error) {
    console.error('Erro ao listar acessos:', error);
    return res.status(500).json({ error: 'Erro ao listar acessos.' });
  }
};

exports.createAccess = async (req, res) => {
  const { role } = req.body;

  try {
    const access = await db.Access.create({ role });
    return res.status(201).json(access);
  } catch (error) {
    console.error('Erro ao criar acesso:', error);
    return res.status(500).json({ error: 'Erro ao criar acesso.' });
  }
};
