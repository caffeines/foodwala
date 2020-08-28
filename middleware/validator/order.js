const { check } = require('express-validator');
const { validate: uuidValidate } = require('uuid');
const errorCodes = require('../../constant/errorCode');
const validate = require('./index');

const createOrderVC = [
  check('deliveryAddress')
    .isLength({ min: 1 })
    .withMessage('Can not be empty'),
  check('items')
    .isArray({ min: 1 })
    .withMessage('Must be an array of minimum 1 menu item')
    .custom((items) => items.every(({ menuId, quantity }) => uuidValidate(menuId)
      && quantity && Number.isInteger(quantity)))
    .withMessage('Must be valid items data'),
];
const validateOrderCreate = (req, res, next) => {
  validate(req, res, next, 'Invalid request data', errorCodes.ORDER_CREATE_INVALID_DATA);
};
module.exports = { createOrderVC, validateOrderCreate };
