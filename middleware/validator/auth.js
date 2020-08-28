const { check, query } = require('express-validator');
const errorCode = require('../../constant/errorCode');
const validate = require('./index');

const registerVC = [
  check('username')
    .isEmail()
    .withMessage('Must be a valid email'),
  check('name')
    .isString()
    .withMessage('Must be string')
    .isLength({ min: 3 })
    .withMessage('Must be at least 3 chars long'),
  check('address')
    .isString()
    .withMessage('Must be string')
    .isLength({ min: 1 })
    .withMessage('Can not be empty'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Must be at least 6 chars long'),
];

const validateRegister = (req, res, next) => {
  validate(req, res, next, 'Invalid request data', errorCode.USER_CREATE_INVALID_DATA);
};

const emailVerifyVC = [
  query('username')
    .isEmail()
    .withMessage('Must be a valid email'),
  query('token')
    .isString()
    .isLength({ min: 8 })
    .withMessage('Must be valid token'),
];

const validateEmailVarification = (req, res, next) => {
  validate(req, res, next, 'Invalid query parameter', errorCode.EMAIL_VERIFY_INVALID_DATA);
};

const loginVC = [
  check('username')
    .isEmail()
    .withMessage('Must be a valid email'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Must be at least 6 chars long'),
];

const validatelogin = (req, res, next) => {
  validate(req, res, next, 'Invalid login data', errorCode.INVALID_LOGIN_DATA);
};

module.exports = {
  validateRegister,
  validateEmailVarification,
  validatelogin,
  emailVerifyVC,
  registerVC,
  loginVC,
};
