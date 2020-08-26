const errorCodes = require('../constant/errorCode');

const auth = {
  /**
   * @api {post} /auth/register Create new user
   * @apiName Register User
   * @apiGroup auth
   * @apiParam {String} name       Name of the User.
   * @apiParam {String} password     Password of the User.
   * @apiParam {String} address      Address of the User.
   * @apiParam {string} username     Valid email of the User.
   * @apiSuccessExample {json} Success-Response:
   * {
   *    "title": "User registration successful",
   *    "status": "200",
   * }
   *
   * @apiSuccessExample {json} Conflict-Response:
   * {
   *    "title": "User already exists",
   *    "status": "409",
   *    "code": 409001
   * }
   *
   */
  register: async (req, res) => {
    const {
      username, password, name, address,
    } = req.body;
    console.log(username, password, name, address);
    res.conflict({
      title: 'User registration successful',
      code: errorCodes.USER_ALREADY_EXITS,
      data: {
        username, password, name, address,
      },
    });
  },
};
module.exports = auth;
