const User = require("../models/user"); // Certifique-se de que o caminho esteja correto

class UserService {
  static async createUser(name, email, password, accessId) {
    return await User.create({ name, email, password, accessId });
  }

  static async deleteUser(id) {
    return await User.destroy({ where: { id } });
  }

  static async listUsers() {
    return await User.findAll();
  }
}

module.exports = UserService;
