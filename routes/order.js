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
router.get(
  '/:orderId',
  isLoggedIn,
  order.getOrderById,
);

exports.orderRouter = router;
