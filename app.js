const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);
const passport = require('passport');
const response = require('./middleware/response');
const knexhelper = require('./lib/knexhelper');
const databaseConfig = require('./config/database');
const serverConfig = require('./config/server');
const sessionConfig = require('./config/session');
const redis = require('./lib/redis');
const errorCodes = require('./constant/errorCode');

redis.init();
const app = express();

knexhelper.configure(databaseConfig);
const bindDataBase = async () => {
  const knex = knexhelper.getKnexInstance();
  // wait for knex to connect, verify by executing a query
  await knex.raw('SELECT 1;');
};

const bindRoutes = require('./routes');

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(response);
app.use(express.urlencoded({ extended: true }));

// set up session
const { client: redisClient } = redis.getClients();
const store = new RedisStore({ client: redisClient });
const session = expressSession({
  store,
  name: sessionConfig.name,
  secret: sessionConfig.secret,
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: { maxAge: sessionConfig.maxAge },
});
app.use(session);
app.use((req, res, next) => {
  if (!req.session) {
    console.error('session store error');
    res.serverError({
      title: 'Session error',
      code: errorCodes.SESSION_ERROR,
    });
    return;
  }
  next();
});

const { init: passportInit } = require('./lib/passport');

passportInit();
app.use(passport.initialize());
app.use(passport.session());

bindRoutes(app);

bindDataBase()
  .then(() => {
    if (serverConfig.nodeEnv !== 'test') { console.log('connected to database'); }
  })
  .catch((err) => console.log(`startup error: ${err.message}`));
module.exports = app;
