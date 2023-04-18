const userModel = require('../models/user.model');

const NotiFyHelper = async ({ user, message, url }) => {
    const {
        phone,
        socketId,
        email_notify,
        sms_notify,
        whatsApp_notify,
        email,
    } = await userModel.findById(user);

    // send notification using WhatsApp
    whatsApp_notify && sendWhatsAppNotification(phone, message);

    // send notification using email
    email_notify && sendEmailNotification(email, message);

    // send notification using SMS
    sms_notify && sendSMSNotification(phone, message);

    // send notification using socket.io
    socketId && io.to(socketId).emit('notification', { message, url });
};

module.exports = NotiFyHelper;

//create a function to send notification using whatsapp
const sendWhatsAppNotification = (phone, message) => {
    // send notification using WhatsApp
};

//create a function to send notification using email
const sendEmailNotification = (email, message) => {
    // send email
};

//create a function to send notification using SMS
const sendSMSNotification = (phone, message) => {
    // send SMS
};
