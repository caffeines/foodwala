const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserImpl = require('../dao/userImpl');
const knex = require('./knexhelper').getKnexInstance();

const init = () => {
  const User = new UserImpl(knex);

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const user = await User.findUserByUsername(username);
      if (!user || !user.password) {
        done(null, false, 'notFound');
        return;
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        done(null, {
          username: user.username,
          name: user.name,
          isVerified: user.isVerified,
          address: user.address,
        }, 'ok');
      } else {
        done(null, false, 'notMatch');
      }
    } catch (err) {
      done(err);
    }
  }));
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (serializedUser, done) => {
    try {
      const { username } = serializedUser;
      const user = await User.findUserByUsername(username);

      if (!user) return done(null, false);
      done(null, {
        username: user.username,
        name: user.name,
        isVerified: user.isVerified,
        address: user.address,
      });
    } catch (err) {
      done(err);
    }
  });
};
exports.init = init;
