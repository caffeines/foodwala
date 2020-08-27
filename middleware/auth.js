const jwt = require('../lib/jwt');
const errorCodes = require('../constant/errorCode');
const constants = require('../constant');
const { getClients } = require('../lib/redis');

const { client } = getClients();

// TODO: Refactor sessionImpl
// TODO: Get token before create one

const getSession = async (username) => {
  try {
    const session = await client.get(`${constants.session}:${username}`);
    return session ? JSON.parse(session) : null;
  } catch (err) {
    return Promise.reject(err);
  }
};

const authenticate = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (typeof bearer === 'undefined') {
    res.unauthorized({
      title: 'Not logged in',
      code: errorCodes.NOT_LOGGED_IN,
    });
    return;
  }
  const [, token] = bearer.split(' ');
  if (token) {
    try {
      const payload = await jwt.verifyToken(token);
      if (!payload) {
        res.unauthorized({
          title: 'Invalid token',
          code: errorCodes.INVALID_TOKEN,
        });
        return;
      }
      const session = await getSession(payload.username);
      if (!session || session.jwt !== token) {
        res.unauthorized({
          title: 'Invalid token',
          code: errorCodes.INVALID_TOKEN,
        });
        return;
      }
      req.user = payload;
      next();
    } catch (err) {
      console.log(err);
      res.serverError({
        title: 'Server error',
        code: errorCodes.INVALID_TOKEN,
        error: err,
      });
    }
  } else {
    res.unauthorized({
      title: 'Not logged in',
      code: errorCodes.NOT_LOGGED_IN,
    });
  }
};

exports.authenticate = authenticate;
