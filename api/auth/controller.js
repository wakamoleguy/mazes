const passwordless = require('passwordless');
const MongoStore = require('passwordless-mongostore');
const email = require('emailjs');

const smtpServer = email.server.connect({
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    host: 'smtp.gmail.com',
    ssl: true
});

passwordless.init(
    new MongoStore(
        process.env.MONGODB_URI ||
        'mongodb://localhost:27017/passwordless-simple-mail'
    ));

passwordless.addDelivery((token, uid, recipient, callback) => {

    const returnUrl = 'http://localhost:3000/api/auth/';

    smtpServer.send({
        text: `Hello! Access your account here: ${returnUrl}?token=${token}&uid=${encodeURIComponent(uid)}`,
        from: 'mailtest@wakamoleguy.com',
        to: recipient,
        subject: 'Token for Mazes Login'
    }, (err, message) => {
        if (err) {
            console.error(err);
        }
        callback(err);
    });
});
