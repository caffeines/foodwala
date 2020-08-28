const errorCodes = require('../constant/errorCode');
const UserImpl = require('../dao/userImpl');
const knex = require('../lib/knexhelper').getKnexInstance();

const user = {
  /**
   * @api {post} /user/profile Profile
   * @apiName Profile
   * @apiGroup user
   * @apiSuccessExample {json} Success
   * {
   *    "status": "200",
   *    "data": {
   *      "username": "sadat.talks@gmail.com",
   *      "name": "Abu Sadat Md. Sayem",
   *      "isVerified": true,
   *      "address": "Dhaka, Bangladesh"
   *    }
   * }
   * @apiSuccessExample {json} Not found
   * {
   *    "title": "User not found",
   *    "status": "404",
   *    "code": 404001
   * }
   * @apiSuccessExample {json} Unauthorized
   * {
   *    "title": "Not logged in",
   *    "status": "401",
   *    "code": 401003
   * }
   */
  getProfile: async (req, res) => {
    try {
      const userRepo = new UserImpl(knex);
      const usr = await userRepo.findUserByUsername(req.user.username, false);
      if (!usr) {
        res.notFound({
          title: 'User not found',
          code: errorCodes.USER_NOT_FOUND,
        });
        return;
      }
      res.ok({ data: usr });
    } catch (err) {
      console.error(err);
      res.serverError({
        title: 'Something went wrong',
        code: errorCodes.USER_CREATE_SERVER_ERROR,
      });
    }
  },
  updateProfile: () => {

  },
  deleteProfile: () => {

  },
};
module.exports = user;
