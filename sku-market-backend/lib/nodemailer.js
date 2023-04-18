const nodemailer = require('nodemailer');

const host = process.env.SMTP_HOST || 'smtp.mailtrap.io';
const port = process.env.SMTP_PORT || 2525;
const user = process.env.SMTP_USER || 'fd8d5c14100827';
const pass = process.env.SMTP_PASSWORD || '35b6b7a8bbb8fd';

// send email to user
exports.sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host,
        port,
        auth: { user, pass },
    });

    const message = {
        from: `${process.env.SMTP_FROM_EMAIL}`,
        to: options.email,
        subject: options.subject,
        html: options.html,
    };

    await transporter.sendMail(message);
};
