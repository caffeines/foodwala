const { formatEnv } = require('../lib/utils');

const vars = formatEnv([
  { name: 'NODE_ENV' },
  { name: 'SERVER_NAME', defaultValue: 'manushai' },
  { name: 'SERVER_HOST', defaultValue: 'localhost' },
  { name: 'SERVER_PORT', type: 'number', defaultValue: '4123' },
  { name: 'SERVER_LINK', defaultValue: 'http://localhost:4123' },
]);

module.exports = {
  nodeEnv: vars.NODE_ENV,
  name: vars.SERVER_NAME,
  host: vars.SERVER_HOST,
  port: vars.SERVER_PORT,
  serverLink: vars.SERVER_LINK,
};
