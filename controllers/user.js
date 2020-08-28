const errorCodes = require('../constant/errorCode');
const UserImpl = require('../dao/userImpl');
const knex = require('../lib/knexhelper').getKnexInstance();

const user = {
  /**
   * @api {get} /user/profile Get Profile
   * @apiName Get Profile
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
  /**
   * @api {patch} /user/profile Update Profile
   * @apiName Update Profile
   * @apiGroup user
   * @apiParam {String} name       Name of the User.
   * @apiParam {String} address      Address of the User.
   * @apiParamExample {json} Request
   * {
   *    "name": "Sadat Sayem ",
   *    "address": "Jamalpur, Bangladesh"
   * }
   * @apiSuccessExample {json} Response - Success
   * {
   *    "title": "User profile update successful",
   *    "status": "200",
   * }
   * @apiSuccessExample {json} Not found
   * {
   *    "title": "User not found",
   *    "status": "404",
   *    "code": 404001
   * }
   * @apiSuccessExample {json} Forbidden
   * {
   *    "title": "User not verified",
   *    "status": "403",
   *    "code": 403001
   * }
   * @apiSuccessExample {json} Unauthorized
   * {
   *    "title": "Not logged in",
   *    "status": "401",
   *    "code": 401003
   * }
   */
  updateProfile: async (req, res) => {
    const { name, address } = req.body;
    const { username } = req.user;
    const userRepo = new UserImpl(knex);
    try {
      const code = await userRepo.updateUser(username, { name, address });
      if (code === 'notFound') {
        res.notFound({
          title: 'User not found',
          code: errorCodes.USER_NOT_FOUND,
        });
        return;
      }
      if (code === 'notVerified') {
        res.forbidden({
          title: 'User not verified',
          code: errorCodes.USER_NOT_VERIFIED,
        });
        return;
      }
      res.ok({
        title: 'User profile update successful',
      });
    } catch (err) {
      console.error(err);
      res.serverError({
        title: 'Something went wrong',
        code: errorCodes.SERVER_ERROR,
      });
    }
  },
  /**
   * @api {delete} /user/profile Delete Profile
   * @apiName Delete Profile
   * @apiGroup user
   * @apiSuccessExample {json} Response - Success
   * {
   *    "title": "User profile delete successful",
   *    "status": "200",
   * }
   * @apiSuccessExample {json} Unauthorized
   * {
   *    "title": "Not logged in",
   *    "status": "401",
   *    "code": 401003
   * }
   * @apiDescription User will be logged out after successfully deleted.
   */
  deleteProfile: async (req, res) => {
    try {
      // TODO: Match password before delete user

      const userRepo = new UserImpl(knex);
      await userRepo.deleteUser(req.user.username);
      req.logout();
      res.ok({
        title: 'User profile delete successful',
      });
    } catch (err) {
      console.error(err);
      res.serverError({
        title: 'Something went wrong',
        code: errorCodes.SERVER_ERROR,
      });
    }
  },
};
module.exports = user;
