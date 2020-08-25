const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const response = require('./middleware/response');
const bindRoutes = require('./routes');
const knexhelper = require('./lib/knexHelper');
const databaseConfig = require('./config/database');

const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(response);
app.use(express.urlencoded({ extended: true }));
bindRoutes(app);
const bindDatabase = async () => {
  knexhelper.configure(databaseConfig);
  const knex = knexhelper.getKnexInstance();
  // wait for knex to connect, verify by executing a query
  await knex.raw('SELECT 1;');
};
bindDatabase()
  .then(() => console.log('connected to database'))
  .catch((err) => console.log(`database connection error: ${err.message}`));
module.exports = app;
