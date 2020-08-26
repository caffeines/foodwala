const { check, validationResult } = require('express-validator');
const errorCode = require('../../constant/errorCode');

const registerVC = [
  check('username')
    .normalizeEmail()
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.badRequest({
      title: 'Invalid request data',
      error: errors.array(),
      code: errorCode.USER_CREATE_INVALID_DATA,
    });
    return;
  }
  next();
};

module.exports = {
  validateRegister,
  registerVC,
};
