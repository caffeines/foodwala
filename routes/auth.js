const express = require('express');

const router = express.Router();
const auth = require('../controllers/auth');
const authValidator = require('../middleware/validator/auth');
const { isLoggedIn } = require('../middleware/auth');

router.post(
  '/register',
  authValidator.registerVC,
  authValidator.validateRegister,
  auth.register,
);

router.get(
  '/verify-email',
  authValidator.emailVerifyVC,
  authValidator.validateEmailVarification,
  auth.verifyEmail,
);

router.post(
  '/login',
  authValidator.loginVC,
  authValidator.validatelogin,
  auth.login,
);

router.get(
  '/logout',
  isLoggedIn,
  auth.logout,
);
exports.authRouter = router;
