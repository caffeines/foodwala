const Redis = require('ioredis');
const config = require('../config/redis');

const protocol = config.ssl ? 'rediss://' : 'redis://';
const redisUrl = `${protocol}:${config.password}@${config.host}:${config.port}`;

let client;
let initFailed = false;
let clientInit = false;

const checkInit = () => (clientInit);

const init = () => {
  client = new Redis(redisUrl);
  client.on('error', (err) => {
    console.error(err);
    if (!initFailed) {
      initFailed = true;
    }
  });
  client.on('connect', () => {
    console.log('connected to redis');
    clientInit = true;
  });
};

const getClients = () => ({ client });

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
