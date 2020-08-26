const express = require('express');

const router = express.Router();
const auth = require('../controllers/auth');
const authValidator = require('../middleware/validator/auth');

router.post(
  '/api/auth/register',
  authValidator.registerVC,
  authValidator.validateRegister,
  auth.register,
);

exports.authRouter = router;
