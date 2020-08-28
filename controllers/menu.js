const errorCodes = require('../constant/errorCode');
const menuImpl = require('../dao/menuImpl');
const knex = require('../lib/knexhelper').getKnexInstance();

const menu = {
  /**
   * @api {get} /menu/ All Menu item
   * @apiName Menu items
   * @apiGroup menu
   * @apiSuccessExample {json} Success
   * {
   *    "status": "200"
   *    "data": [{
   *        "id": "d4c14dec-abe9-4a9a-8517-2efb7f17afcb",
   *         "name": "Dummy-1",
   *          "status": "inStock",
   *          "description": "Lorem Ipsum is simply dummy text of the...",
   *          "price": 160,
   *          "createdAt": "2020-08-28T14:46:32.914Z",
   *          "updatedAt": "2020-08-28T14:46:32.914Z"
   *     }]
   * }
   * @apiSuccessExample {json} Unauthorized
   * {
   *    "title": "Not logged in",
   *    "status": "401",
   *    "code": 401003
   * }
   */
  getAllMenus: async (req, res) => {
    try {
      // TODO: Paginate
      const menuRepo = new menuImpl(knex);
      const menus = await menuRepo.findAllMenus();
      res.ok({ data: menus });
    } catch (err) {
      console.log(err);
      res.serverError({
        title: 'Something went wrong',
        code: errorCodes.SERVER_ERROR,
      });
    }
  },
};
module.exports = menu;
