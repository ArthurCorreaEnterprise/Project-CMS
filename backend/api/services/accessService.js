const Access = require('../models/access'); // Certifique-se de que o caminho esteja correto

class AccessService {
  static async createAccess(name) {
    return await Access.create({ name });
  }

  static async deleteAccess(id) {
    return await Access.destroy({ where: { id } });
  }

  static async listAccess() {
    return await Access.findAll();
  }
}

module.exports = AccessService;
