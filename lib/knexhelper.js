let knex = null;
let configured = false;

const configure = (config) => {
  // eslint-disable-next-line
  knex = require('knex')({
    client: 'pg',
    connection: config.connection,
    pool: config.pool,
  });
  configured = true;
};

exports.configure = configure;

const getKnexInstance = () => {
  if (!configured) {
    configure();
  }
  return knex;
};
exports.getKnexInstance = getKnexInstance;
