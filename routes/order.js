const express = require('express');

const router = express.Router();
const { isLoggedIn } = require('../middleware/auth');
const order = require('../controllers/order');

router.post(
  '/',
  isLoggedIn,
  order.createOrder,
);

exports.orderRouter = router;
