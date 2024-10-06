const { Access } = require("../models");

const createAccess = async (accessData) => {
  const { role } = accessData;
  const access = await Access.create({
    role,
  });
};

const getAccess = async () => {
  const access = await Access.findAll();
  return access;
};

const deleteAccess = async (id) => {
  const access = await Access.findByPk(id);
  if (!access) {
    throw new Error("Acesso não encontrado");
  }
  await access.destroy();
};

module.exports = {
  createAccess,
  getAccess,
  deleteAccess,
};
