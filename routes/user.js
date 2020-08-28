const express = require('express');
const { isLoggedIn } = require('../middleware/auth');
const user = require('../controllers/user');

const router = express.Router();

router.get(
  '/api/user/profile',
  isLoggedIn,
  user.getProfile,
);

router.patch(
  '/api/user/profile',
  isLoggedIn,
  user.updateProfile,
);

router.delete(
  '/api/user/profile',
  isLoggedIn,
  user.deleteProfile,
);
exports.userRouter = router;
