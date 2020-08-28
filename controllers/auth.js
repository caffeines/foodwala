const passport = require('passport');
const bcrypt = require('bcrypt');
const shortUUID = require('short-uuid');
const errorCodes = require('../constant/errorCode');
const UserImpl = require('../dao/userImpl');
const knex = require('../lib/knexhelper').getKnexInstance();
const serverConfig = require('../config/server');
const taskEmitter = require('../queue/taskEmitter');

const makeEmail = (user, subject) => {
  const url = `${serverConfig.serverLink}/api/auth/verify-email?username=${user.username}&token=${user.verificationCode}`;
  return {
    body: `Hello ${user.name}<br>
    Please verify your email by clicking this url
    <a href="${url}">${url}</a><br><br>

    Thanks,<br>
    Sadat<br>
    `,
    to: user.username,
    subject,
  };
};

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

      const user = await User.findUserByUsername(username, true);
      if (user) {
        if (!user.isVerified) {
          const verificationCode = shortUUID.generate();
          await User.updateUser(username, {
            verificationCode,
            verificationCodeGeneratedAt: new Date(),
          });
          taskEmitter(makeEmail({ ...user, verificationCode }, 'Verify your email'));
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
      const hashPassword = await bcrypt.hash(password, serverConfig.saltRound);
      const createdUser = await User.createUser({
        username, password: hashPassword, name, address,
      });
      taskEmitter(makeEmail(createdUser, 'Verify your email'));
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
      const code = await User.verifyUser(username, token);
      if (code === 'notFound') {
        res.notFound({
          title: 'User not found',
          code: errorCodes.USER_NOT_FOUND,
        });
        return;
      }
      if (code === 'alreadyVerified') {
        res.ok({
          title: 'Email already verified',
        });
        return;
      }
      if (code === 'doesNotMatch') {
        res.unauthorized({
          title: 'Verification code does not match',
          code: errorCodes.VERIFICATION_CODE_NOT_MATCH,
        });
        return;
      }
      if (code === 'expired') {
        res.badRequest({
          title: 'Verification code expired',
          code: errorCodes.VERIFICATION_CODE_EXPIRED,
        });
        return;
      }
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
   *    "title": "Login Successful",
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
   * @apiSuccessExample {json} Bad request
   * {
   *    "title": "Invalid query parameter",
   *     "status": "400",
   *     "errors": [
   *      {
   *       "value": "@sadat.talksgmail.com",
   *       "msg": "Must be a valid email",
   *       "param": "username",
   *       "location": "body"
   *      }
   *    ],
   *    "code": 400002
   * }
   * @apiParamExample {json} Request-Example:
   * {
   *    "username": "sadat.talks@gmail.com",
   *    "password": "sadat@642"
   * }
   * @apiSuccessExample {json} Bad request [not verified]
   * {
   *    "title": "Email already verified",
   *    "status": "200",
   * }
   *
   */
  login: async (req, res) => {
    const User = new UserImpl(knex);
    passport.authenticate('local', async (err, user, code) => {
      if (err) {
        res.serverError(err);
        return;
      }
      if (code === 'notFound') {
        res.notFound({
          title: 'User not registerd',
          code: errorCodes.USER_NOT_FOUND,
        });
        return;
      }
      if (code === 'notMatch') {
        res.unauthorized({
          title: 'Incorrect password',
          code: errorCodes.INCORRECT_PASSWORD,
        });
        return;
      }
      if (!user.isVerified) {
        const verificationCode = shortUUID.generate();
        await User.updateUser(user.username, {
          verificationCode,
          verificationCodeGeneratedAt: new Date(),
        });
        taskEmitter(makeEmail({ ...user, verificationCode }, 'Verify your email'));
        res.badRequest({
          title: 'Verify your email',
          code: errorCodes.USER_EMAIL_NOT_VERIFIED,
        });
        return;
      }

      req.logIn(user, (loginErr) => {
        if (loginErr) {
          res.serverError({
            title: 'Login failed',
            code: errorCodes.SERVER_ERROR,
          });
          return;
        }
        res.ok({
          title: 'Login Successful',
          data: user,
        });
      });
    })(req, res);
  },
  /**
   * @api {get} /auth/logout Logout
   * @apiName Logout
   * @apiGroup auth
   * @apiSuccessExample {json} Success
   * {
   *    "title": "Logout successful",
   *    "status": "200"
   * }
   * @apiSuccessExample {json} Unauthorized
   * {
   *    "title": "Not logged in",
   *    "status": "401",
   *    "code": 401003
   * }
   */
  logout: (req, res) => {
    req.logout();
    res.ok({
      title: 'Logout successful',
    });
  },
};
module.exports = auth;
