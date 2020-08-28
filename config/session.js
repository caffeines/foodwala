const { formatEnv } = require('../lib/utils');

const vars = formatEnv([
  { name: 'SESSION_NAME', defaultValue: 'caffeines' },
  { name: 'SESSION_SECRET' },
  { name: 'SESSION_MAX_AGE', type: 'number', defaultValue: 30 * 24 * 60 * 60 * 1000 },
]);

module.exports = {
  name: vars.SESSION_NAME,
  secret: vars.SESSION_SECRET,
  maxAge: vars.SESSION_MAX_AGE, // 365 days
};
