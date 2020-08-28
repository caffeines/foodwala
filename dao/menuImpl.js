class Menu {
  constructor(knex) {
    this.knex = knex;
  }

  async findAllMenus() {
    try {
      const menus = await this.knex('Menu').select('*');
      return menus;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
module.exports = Menu;
