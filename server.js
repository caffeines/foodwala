const server = require('./app');
const configServer = require('./config/server');

const port = Number(process.env.PORT) || configServer.port;
server.listen(port, () => {
  console.log(`server listening on port ${port}...`);
});
