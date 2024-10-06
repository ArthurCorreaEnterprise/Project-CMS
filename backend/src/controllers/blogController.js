const blogService = require("../services/blogService");

// Função para obter blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getBlogs();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Erro ao obter blogs:", error);
    res.status(500).json({ error: "Erro ao obter blogs." });
  }
};

// Função para criar um novo blog
const createBlog = async (req, res) => {
  try {
    const { title, content, category_id, user_id, views } = req.body;
    const cover = req.file; // Aqui você pega o arquivo

    // Validação básica dos dados
    if (!title || !content || !category_id || !user_id) {
      return res.status(400).json({ error: "Título, conteúdo, categoria e ID de usuário são obrigatórios." });
    }

    // Verifica se a imagem de capa foi carregada
    if (!cover) {
      return res.status(400).json({ error: "A imagem de capa é obrigatória." });
    }

    const blog = await blogService.createBlog({
      title,
      content,
      cover: cover.path, // Salva o caminho da imagem
      category_id,
      user_id,
      views: views || 0, // Define views como 0 se não fornecido
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error("Erro ao criar blog:", error);
    res.status(500).json({ error: "Erro ao criar blog." });
  }
};

// Função para deletar um blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await blogService.deleteBlog(id);
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar blog:", error);
    res.status(500).json({ error: "Erro ao deletar blog." });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  deleteBlog,
};
