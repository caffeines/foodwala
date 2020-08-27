const { formatEnv } = require('../lib/utils');

const vars = formatEnv([
  { name: 'MAIL_GUN_API_KEY', type: 'string' },
  { name: 'MAIL_GUN_DOMAIN', type: 'string' },
]);

module.exports = {
  apiKey: vars.MAIL_GUN_API_KEY,
  domain: vars.MAIL_GUN_DOMAIN,
};
