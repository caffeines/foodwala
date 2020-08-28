const express = require('express');

const router = express.Router();
const auth = require('../controllers/auth');
const authValidator = require('../middleware/validator/auth');
const { isLoggedIn } = require('../middleware/auth');

router.post(
  '/api/auth/register',
  authValidator.registerVC,
  authValidator.validateRegister,
  auth.register,
);

router.get(
  '/api/auth/verify-email',
  authValidator.emailVerifyVC,
  authValidator.validateEmailVarification,
  auth.verifyEmail,
);

router.post(
  '/api/auth/login',
  authValidator.loginVC,
  authValidator.validatelogin,
  auth.login,
);

router.get(
  '/api/auth/logout',
  isLoggedIn,
  auth.logout,
);
exports.authRouter = router;
