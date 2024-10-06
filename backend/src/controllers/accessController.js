const accessService = require("../services/accessService");

const getAccess = async (req, res) => {
  try {
    const access = await accessService.getAccess();
    res.status(200).json(access);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createAccess = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await accessService.createAccess({
      role,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const deleteAccess = async (req, res) => {
  try {
    const { id } = req.params;
    await accessService.deleteAccess(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAccess,
  getAccess,
  deleteAccess,
};