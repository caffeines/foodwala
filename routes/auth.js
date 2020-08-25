const express = require('express');

const router = express.Router();

router.get('/api/auth', (req, res) => {
  res.status(200).json({
    message: 'auth',
  });
});
exports.authRouter = router;
