const Redis = require('ioredis');
const config = require('../config/redis');

const protocol = config.redis.ssl ? 'rediss://' : 'redis://';
const redisUrl = `${protocol}:${config.redis.password}@${config.redis.host}:${config.redis.port}`;

let client;
let initFailed = false;
let clientInit = false;

const checkInit = () => (clientInit);

const init = (callback) => {
  client = new Redis(redisUrl);
  client.on('error', (err) => {
    if (!initFailed) {
      initFailed = true;
      callback(err);
    }
  });
  client.on('connect', () => {
    clientInit = true;
    if (checkInit()) callback();
  });
};

const getClients = () => {
  if (!checkInit()) throw new Error('not initialized');
  return { client };
};

const close = (callback) => {
  client.disconnect();
  setImmediate(callback);
};

module.exports = {
  close,
  getClients,
  init,
  checkInit,
};
