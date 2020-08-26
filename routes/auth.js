const express = require('express');

const router = express.Router();
const auth = require('../controllers/auth');

router.post('/api/auth/register', auth.register);
exports.authRouter = router;
