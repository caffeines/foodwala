const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const response = require('./middleware/response');
const bindRoutes = require('./routes');

const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(response);
app.use(express.urlencoded({ extended: true }));
bindRoutes(app);
module.exports = app;
