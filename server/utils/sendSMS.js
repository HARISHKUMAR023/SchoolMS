const twilio = require('twilio');
const accountSid = 'AC50662f4f946b263d3e60d3e911ea91c2'; // Your Account SID from www.twilio.com/console
const authToken = '836f3874e50f374779674c42dee01240';   // Your Auth Token from www.twilio.com/console

const client = new twilio(accountSid, authToken);

const sendSMS = (to, message) => {
  // Ensure the phone number is in E.164 format
  if (!to.startsWith('+')) {
    to = `+91${to}`;
  }

  return client.messages.create({
    body: message,
    to,  // Text this number
    from: '+14325353444' // From a valid Twilio number
  });
};

module.exports = sendSMS;
