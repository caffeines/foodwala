const { formatEnv } = require('../lib/utils');

const vars = formatEnv([
  { name: 'RABBITMQ_USERNAME', type: 'string' },
  { name: 'RABBITMQ_PASSWORD', type: 'string' },
  { name: 'RABBITMQ_HOST', type: 'string' },
  { name: 'RABBITMQ_PORT', type: 'number' },
]);

module.exports = {
  username: vars.RABBITMQ_USERNAME,
  password: vars.RABBITMQ_PASSWORD,
  host: vars.RABBITMQ_HOST,
  port: vars.RABBITMQ_PORT,
};
