const { userRouter } = require('./user');
const { authRouter } = require('./auth');

const bindRoutes = (app) => {
  app.get('/', (req, res) => {
    res.ok({
      title: 'Health check OK',
      data: 'OK',
    });
  });
  app.use(userRouter);
  app.use(authRouter);
};
module.exports = bindRoutes;
