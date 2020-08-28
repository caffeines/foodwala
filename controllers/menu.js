const errorCodes = require('../constant/errorCode');
const menuImpl = require('../dao/menuImpl');
const knex = require('../lib/knexhelper').getKnexInstance();

const menu = {
  getAllMenus: async (req, res) => {
    try {
      res.ok({});
    } catch (err) {
      console.log(err);
      res.serverError({
        title: 'Email verification failed',
        code: errorCodes.SERVER_ERROR,
      });
    }
  },
};
module.exports = menu;
