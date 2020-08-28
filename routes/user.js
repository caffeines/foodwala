const express = require('express');
const { isLoggedIn } = require('../middleware/auth');
const user = require('../controllers/user');

const router = express.Router();

router.get(
  '/api/user/profile',
  isLoggedIn,
  user.getProfile,
);
exports.userRouter = router;
