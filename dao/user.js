const shortUUID = require('short-uuid');

const safeFields = ['username', 'isVerified', 'name', 'address'];

class User {
  constructor(knex) {
    this.knex = knex;
  }

  async createUser(data) {
    try {
      const now = new Date();
      const user = {
        ...data,
        isVerified: false,
        verificationCode: shortUUID.generate(),
        verificationCodeGeneratedAt: now,
        joinedAt: now,
        updatedAt: now,
      };
      await this.knex('User')
        .insert(user);
      return user;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async findUserByUsername(username) {
    try {
      const [user] = await this.knex('User')
        .select([...safeFields, 'verificationCode', 'verificationCodeGeneratedAt'])
        .where({ username });
      return user;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async removeAll() {
    await this.knex('User').del();
  }
}

module.exports = User;
