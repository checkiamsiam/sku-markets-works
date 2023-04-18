const twilio = require('twilio');

// sent OTP to user phone
const sendSMS = async (options) => {
    const client = new twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );

    const message = await client.messages.create(options);

    return message;
};

module.exports = sendSMS;
