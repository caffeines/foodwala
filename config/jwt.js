const { formatEnv } = require('../lib/utils');

const vars = formatEnv([
  { name: 'JWT_SECRET' },
  { name: 'JWT_TTL', type: 'number', defaultValue: '30d' },
]);

module.exports = {
  secret: vars.JWT_SECRET,
  TTL: vars.JWT_TTL,
};
