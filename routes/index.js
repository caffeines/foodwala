const { userRouter } = require('./user');
const { authRouter } = require('./auth');
const { menuRouter } = require('./menu');
const { orderRouter } = require('./order');

const bindRoutes = (app) => {
  app.get('/', (req, res) => {
    res.ok({
      title: 'Health check OK',
      data: 'OK',
    });
  });
  app.use('/api/user', userRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/menu', menuRouter);
  app.use('/api/order', orderRouter);
};
module.exports = bindRoutes;
