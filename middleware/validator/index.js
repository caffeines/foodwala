const { validationResult } = require('express-validator');

const validate = (req, res, next, title, code) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.badRequest({
      title,
      error: errors.array(),
      code,
    });
    return;
  }
  next();
};
module.exports = validate;
