const { Blog } = require("../models");

// Função para criar um blog
const createBlog = async (blogData) => {
  const { title, content, cover, category_id, user_id, views } = blogData;

  // Validação básica dos dados
  if (!title || !content || !category_id || !user_id) {
    throw new Error("Título, conteúdo, categoria e ID de usuário são obrigatórios.");
  }

  try {
    const blog = await Blog.create({
      title,
      content,
      cover, // Presume-se que cover pode ser null ou string
      category_id,
      user_id,
      views: views || 0, // Se views não for fornecido, inicializa como 0
    });
    return blog;
  } catch (error) {
    console.error("Erro ao criar blog:", error);
    throw new Error("Erro ao criar blog.");
  }
};

// Função para obter todos os blogs
const getBlogs = async () => {
  try {
    const blogs = await Blog.findAll();
    return blogs;
  } catch (error) {
    console.error("Erro ao obter blogs:", error);
    throw new Error("Erro ao obter blogs.");
  }
};

// Função para deletar um blog
const deleteBlog = async (id) => {
  try {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      throw new Error("Blog não encontrado");
    }
    await blog.destroy();
  } catch (error) {
    console.error("Erro ao deletar blog:", error);
    throw new Error("Erro ao deletar blog.");
  }
};

module.exports = {
  createBlog,
  getBlogs,
  deleteBlog,
};
