const mailgun = require('mailgun-js');
const { apiKey, domain } = require('../config/mailgun');

const mg = mailgun({ apiKey, domain });

const sendMail = ({ to, subject, body }) => new Promise((resolve, reject) => {
  const data = {
    from: 'Sadat <hello@sadat.dev>',
    to: 'me.caffeines@gmail.com',
    subject,
    html: body,
  };
  mg.messages().send(data, (error, ack) => {
    if (error) {
      reject(error);
    }
    resolve(ack);
  });
});
module.exports = sendMail;
