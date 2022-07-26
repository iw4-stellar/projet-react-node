const sendgrid = require('@sendgrid/mail');
const logger = require('../lib/logger');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const mail = process.env.STELLAR_MAIL;

module.exports.sendConfirmationEmail = async (user) => {
    sendgrid.send({
        from: `"Stellar" <${mail}>`,
        to: user.email,
        subject: 'Confirm your account',
        html: `<h1>Email confirmation</h1>
            <p>Hello ${user.firstname} ${user.lastname},</p>
            <p>Please confirm your account by clicking the link below:</p>
            <a href="http://localhost:3000/confirm/${user.token}">Confirm</a>`
    })
    .then(() => logger.info(`Confirmation email sent to ${user.email}`))
    .catch((err) => logger.error(`Error sending confirmation email to ${user.email}. `, err));
};