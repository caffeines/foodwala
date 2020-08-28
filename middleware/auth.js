const errorCodes = require('../constant/errorCode');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.unauthorized({
    title: 'Not logged in',
    code: errorCodes.NOT_LOGGED_IN,
  });
};

exports.isLoggedIn = isLoggedIn;
