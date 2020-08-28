const shortUUID = require('short-uuid');
const configServer = require('../config/server');

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

  async findUserByUsername(username, safe) {
    try {
      let selector = [...safeFields];
      if (safe) selector = '*';
      const [user] = await this.knex('User')
        .select(selector)
        .where({ username });
      return user;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async verifyUser(username, verificationCode) {
    try {
      const result = await this.knex.transaction(async (txn) => {
        const [user] = await txn('User').where({ username }).forUpdate();
        if (!user) return 'notFound';
        if (user.isVerified) return 'alreadyVerified';
        if (user.verificationCode !== verificationCode) return 'doesNotMatch';
        const expirationTimestamp = user.verificationCodeGeneratedAt.getTime()
        + (configServer.verificationCodeTTL * 1000);
        const verificationCodeExpiresAt = new Date(expirationTimestamp);
        if (verificationCodeExpiresAt <= new Date()) return 'expired';

        await txn('User').update({ isVerified: true, verificationCode: null }).where({ username });
        return 'success';
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async updateUser(username, data) {
    try {
      const result = await this.knex.transaction(async (txn) => {
        const [user] = await txn('User').where({ username }).forUpdate();
        if (!user) return 'notFound';
        if (!user.isVerified) return 'notVerified';
        await txn('User')
          .update(data)
          .where({ username });
        return 'success';
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async deleteUser(username) {
    try {
      await this.knex('User')
        .where({ username })
        .del();
      return {};
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async removeAll() {
    await this.knex('User').del();
  }
}

module.exports = User;
