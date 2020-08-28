const express = require('express');

const router = express.Router();
const menu = require('../controllers/menu');
const { isLoggedIn } = require('../middleware/auth');

router.get(
  '/',
  isLoggedIn,
  menu.getAllMenus,
);

exports.menuRouter = router;
