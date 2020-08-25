const http = require('http');
const cors = require('cors');
const express = require('express');
const expressSession = require('express-session');
const helmet = require('helmet');
const morgan = require('morgan');
// const configServer = require('./config/server');
// const response = require('./middleware/response');

const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
// app.use(response);
app.use(express.urlencoded({ extended: true }));

// app.use(routes);
module.exports = app;
