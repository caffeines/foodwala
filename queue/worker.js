const amqp = require('amqplib/callback_api');
const sendMail = require('../service/mailer');
const constant = require('../constant/index');
const {
  username, password, host, port,
} = require('../config/rabbitmq');

amqp.connect(`amqp://${username}:${password}@${host}:${port}/`, (err, con) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Successfully conncected...');
  }

  con.createChannel((err1, channel) => {
    if (err) {
      throw err1;
    }
    const queue = constant.EMAIL_QUEUE;
    channel.assertQueue(queue, { durable: true });
    channel.prefetch(1);
    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);
    channel.consume(queue, (msg) => {
      const secs = msg.content.toString().split('.').length - 1;
      const email = JSON.parse(msg.content.toString());
      console.log(' [x] Received %s email', email.subject);
      sendMail(email).catch((e) => console.log(e.message));
      setTimeout(() => {
        channel.ack(msg);
      }, secs * 1000);
    }, { noAck: false });
  });
});
