const passwordless = require('passwordless');
const MongoStore = require('passwordless-mongostore');
const email = require('emailjs');
const session = require('express-session');

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
    )
);

passwordless.addDelivery((token, uid, recipient, callback) => {

    // FIXME - Inject this from above.
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

module.exports = {

    support() {

        return [
            session({
                secret: 'fixme secret',
                cookie: { maxAge: 60 * 60 * 1000 }
            }),
            passwordless.sessionSupport()
        ];
    },

    requestToken: passwordless.requestToken.bind(passwordless),
    acceptToken: (options) => {

        return (req, res, next) => {
            const middleware = passwordless.acceptToken({
                successRedirect: options.successRedirect?
                    req.baseUrl + options.successRedirect : null,
                enableOriginRedirect: options.enableOriginRedirect,
                tokenField: options.tokenField,
                uidField: options.uidField,
                allowPost: options.allowPost
            });

            middleware(req, res, next);
        };
    },
    restricted: (options) => {

        return (req, res, next) => {

            const middleware = passwordless.restricted({
                failureRedirect: options.failureRedirect?
                    req.baseUrl + options.failureRedirect : null,
                originField: options.originField
            });

            middleware(req, res, next);
        };
    }
};
