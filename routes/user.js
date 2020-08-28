const express = require('express');
const { isLoggedIn } = require('../middleware/auth');
const user = require('../controllers/user');

const router = express.Router();

router.get(
  '/profile',
  isLoggedIn,
  user.getProfile,
);

router.patch(
  '/profile',
  isLoggedIn,
  user.updateProfile,
);

router.delete(
  '/profile',
  isLoggedIn,
  user.deleteProfile,
);
exports.userRouter = router;
