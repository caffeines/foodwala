const express = require('express');
const errorCodes = require('../constant/errorCode');

const router = express.Router();

router.get('/api/user', (req, res) => {
  res.notFound({
    title: 'User not found',
    code: errorCodes.NOT_FOUND,
    error: ['user not found'],
  });
});

exports.userRouter = router;
