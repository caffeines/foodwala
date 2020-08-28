const express = require('express');

const router = express.Router();
const { isLoggedIn } = require('../middleware/auth');
const order = require('../controllers/order');
const orderValidator = require('../middleware/validator/order');

router.post(
  '/',
  isLoggedIn,
  orderValidator.createOrderVC,
  orderValidator.validateOrderCreate,
  order.createOrder,
);

exports.orderRouter = router;
