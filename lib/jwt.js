const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const constant = require('../constant');

const signAsync = Promise.promisify(jwt.sign);
const verifyAsync = Promise.promisify(jwt.verify);
const { getClients } = require('./redis');

const { client } = getClients();

const saveSession = (session) => {
  const sessionJO = JSON.stringify(session);
  const seconds = parseInt(config.jwt.TTL, 10) * 86400;
  client.set(`${constant.session}:${session.username}`, sessionJO, 'ex', seconds);
};

const getAdminToken = async (username) => {
  const paylaod = {
    username,
    type: constant.jwt.PUBLIC,
  };
  const token = signAsync(paylaod, config.jwt.secret, { expiresIn: config.jwt.TTL });
  const now = Date.now();
  const session = {
    jwt: token,
    username,
    type: constant.jwt.PUBLIC,
    createdAt: now,
  };
  saveSession(session);
  return token;
};

exports.getAdminToken = getAdminToken;

const verifyToken = async (token) => {
  try {
    const payload = await verifyAsync(token, config.jwt.secret);
    return payload;
  } catch (err) {
    return null;
  }
};

exports.verifyToken = verifyToken;
