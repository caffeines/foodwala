const amqp = require('amqplib/callback_api');
const constant = require('../constant/index');

const {
  username, password, host, port,
} = require('../config/rabbitmq');

const emitTask = (email) => {
  amqp.connect(`amqp://${username}:${password}@${host}:${port}/`, (err, con) => {
    if (err) {
      console.error(err);
    }
    con.createChannel((err1, channel) => {
      if (err1) {
        throw err1;
      }
      const queue = constant.EMAIL_QUEUE;
      const msg = JSON.stringify(email);

      channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(msg), { persistent: false });
      console.log(' [x] Sent %s email', email.subject);
    });
    setTimeout(() => {
      con.close();
    }, 500);
  });
};
module.exports = emitTask;
