const { check, query, validationResult } = require('express-validator');
const errorCode = require('../../constant/errorCode');

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

const validate = (req, res, next, title, code) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.badRequest({
      title,
      error: errors.array(),
      code,
    });
    return;
  }
  next();
};

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

module.exports = {
  validateRegister,
  validateEmailVarification,
  emailVerifyVC,
  registerVC,
};
