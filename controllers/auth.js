const errorCodes = require('../constant/errorCode');
const UserImpl = require('../dao/userImpl');
const knex = require('../lib/knexhelper').getKnexInstance();
const serverConfig = require('../config/server');

const auth = {
  /**
   * @api {post} /auth/register Create new user
   * @apiName Register User
   * @apiGroup auth
   * @apiParam {String} name       Name of the User.
   * @apiParam {String} password     Password of the User.
   * @apiParam {String} address      Address of the User.
   * @apiParam {string} username     Valid email of the User.
   * @apiSuccessExample {json} Success
   * {
   *    "title": "User registration successful",
   *    "status": "200",
   * }
   *
   * @apiSuccessExample {json} Conflict
   * {
   *    "title": "User already exists",
   *    "status": "409",
   *    "code": 409001
   * }
   * @apiSuccessExample {json} Bad request
   * {
   *    "title": "Invalid request data",
   *     "status": "400",
   *     "errors": [
   *      {
   *       "value": "@sadat.talksgmail.com",
   *       "msg": "Must be a valid email",
   *       "param": "username",
   *       "location": "body"
   *      }
   *    ],
   *    "code": 400001
   * }
   *
   */
  register: async (req, res) => {
    try {
      const {
        username, password, name, address,
      } = req.body;

      const User = new UserImpl(knex);

      const user = await User.findUserByUsername(username);
      if (user) {
        if (!user.isVerified) {
          // TODO: Send email
          const url = `${serverConfig.serverLink}/api/auth/verify-email?username=${username}&token=${user.verificationCode}`;
          // console.log(url);
          res.badRequest({
            title: 'Verify your email',
            code: errorCodes.USER_EMAIL_NOT_VERIFIED,
          });
          return;
        }

        res.conflict({
          title: 'User already exist',
          code: errorCodes.USER_ALREADY_EXITS,
        });
        return;
      }

      const createdUser = await User.createUser({
        username, password, name, address,
      });
      const url = `${serverConfig.serverLink}/api/auth/verify-email?username=${username}&token=${createdUser.verificationCode}`;
      // console.log(url);

      // TODO: Send email
      res.ok({
        title: 'User registration successful',
        data: { message: 'Email sent' },
      });
    } catch (err) {
      console.log(err);
      res.serverError({
        title: 'User registration failed',
        code: errorCodes.USER_CREATE_SERVER_ERROR,
      });
    }
  },
  /**
   * @api {get} /auth/verify-email?username=sadat.talks@gmail.com&token=aszdian4a1s Email verify
   * @apiName Verify Email
   * @apiGroup auth
   * @apiParam {String} useraname Valid username of the User.
   * @apiParam {String} token     verification token.
   * @apiSuccessExample {json} Success
   * {
   *    "title": "Email verification successful",
   *    "status": "200",
   * }
   * @apiSuccessExample {json} Success [if already verified]
   * {
   *    "title": "Email already verified",
   *    "status": "200",
   * }
   *
   * @apiSuccessExample {json} Not found
   * {
   *    "title": "User not found",
   *    "status": "404",
   *    "code": 404001
   * }
   * @apiSuccessExample {json} Bad request
   * {
   *    "title": "Invalid query parameter",
   *     "status": "400",
   *     "errors": [
   *      {
   *       "value": "@sadat.talksgmail.com",
   *       "msg": "Must be a valid email",
   *       "param": "username",
   *       "location": "query"
   *      }
   *    ],
   *    "code": 400002
   * }
   *
   */
  verifyEmail: async (req, res) => {
    try {
      const { username, token } = req.query;
      const User = new UserImpl(knex);
      const user = await User.findUserByUsername(username);
      if (!user) {
        res.notFound({
          title: 'User not found',
          code: errorCodes.USER_NOT_FOUND,
        });
        return;
      }
      if (user.isVerified) {
        res.ok({
          title: 'Email already verified',
        });
        return;
      }
      if (user.verificationCode !== token) {
        res.unauthorized({
          title: 'Verification code not match',
          code: errorCodes.VERIFICATION_CODE_NOT_MATCH,
        });
        return;
      }
      await User.updateUser(username, { ...user, isVerified: true });
      res.ok({
        title: 'Email verification successful',
      });
    } catch (err) {
      console.log(err);
      res.serverError({
        title: 'Email verification failed',
        code: errorCodes.SERVER_ERROR,
      });
    }
  },
  /**
   * @api {post} /auth/login Login
   * @apiName Login
   * @apiGroup auth
   * @apiParam {String} useraname Valid username of the User.
   * @apiParam {String} password  Password of the User.
   * @apiSuccessExample {json} Success
   * {
   *    "title": "Login successful",
   *    "status": "200",
   * }
   * @apiSuccessExample {json} Not found
   * {
   *    "title": "User not found",
   *    "status": "404",
   *    "code": 404001
   * }
   * @apiSuccessExample {json} Bad request
   * {
   *    "title": "Invalid query parameter",
   *     "status": "400",
   *     "errors": [
   *      {
   *       "value": "@sadat.talksgmail.com",
   *       "msg": "Must be a valid email",
   *       "param": "username",
   *       "location": "query"
   *      }
   *    ],
   *    "code": 400002
   * }
   * @apiSuccessExample {json} Bad request [not verified]
   * {
   *    "title": "Email already verified",
   *    "status": "200",
   * }
   *
   */
  login: async (req, res) => {
    try {
      res.ok({});
    } catch (err) {
      console.log(err);
      res.serverError({
        title: 'Login failed',
        code: errorCodes.SERVER_ERROR,
      });
    }
  },
};
module.exports = auth;
