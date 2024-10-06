const { Category } = require("../models");

const createCategory = async (categoryData) => {
  const { name, icon } = categoryData;
  const category = await Category.create({
    name,
    icon,
  });
  return category;
};

const getCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

const deleteCategory = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new Error("Categoria não encontrada");
  }
  await category.destroy();
};

module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
};
