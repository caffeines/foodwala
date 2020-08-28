const { check } = require('express-validator');
const errorCodes = require('../../constant/errorCode');
const validate = require('./index');

const updateVC = [
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
];
const validateUpdate = (req, res, next) => {
  validate(req, res, next, 'Invalid request data', errorCodes.USER_UPDATE_INVALID_DATA);
};
module.exports = { updateVC, validateUpdate };
