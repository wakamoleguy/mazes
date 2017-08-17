const passwordless = require('passwordless');
const MongoStore = require('passwordless-mongostore');
const email = require('emailjs');

const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;

if (!emailUser || !emailPassword) {
    throw new Error('Missing email user or password');
}

const smtpServer = email.server.connect({
    user: emailUser,
    password: emailPassword,
    host: 'smtp.gmail.com',
    ssl: true
});

passwordless.init(
    new MongoStore(
        process.env.MONGODB_URI ||
        'mongodb://localhost:27017/passwordless-simple-mail'
    ));

passwordless.addDelivery((token, uid, recipient, callback) => {

    const returnUrl = 'http://localhost:3000/auth/';

    smtpServer.send({
        text: 'Hello! Access your account here: ' +
            `${returnUrl}?token=${token}&uid=${encodeURIComponent(uid)}`,
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
