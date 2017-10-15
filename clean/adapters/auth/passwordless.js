const passwordless = require('passwordless');
const MongoStore = require('passwordless-mongostore');
const email = require('emailjs');
const session = require('express-session');

const emailUser = global.process.env.EMAIL_USER;
const emailPassword = global.process.env.EMAIL_PASSWORD;

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
        global.process.env.MONGODB_URI ||
        'mongodb://localhost:27017/passwordless-simple-mail'
    )
);

passwordless.addDelivery((token, uid, recipient, callback) => {

    // FIXME - Inject this from above.
    const returnUrl = 'http://localhost:3000/app/login/accept/';

    smtpServer.send({
        text: 'Hello! Access your account here: ' +
        `${returnUrl}?token=${token}&uid=${encodeURIComponent(uid)}`,
        from: 'mailtest@wakamoleguy.com',
        to: recipient,
        subject: 'Token for Mazes Login'
    }, (err) => {
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
                cookie: { maxAge: 60 * 60 * 1000 },
                resave: false, // TODO - Check this option when using prod store
                saveUninitialized: false
            }),
            passwordless.sessionSupport()
        ];
    },

    requestToken: passwordless.requestToken.bind(passwordless),
    acceptToken: (options) => (req, res, next) => {
        const middleware = passwordless.acceptToken({
            successRedirect: options.successRedirect?
                req.baseUrl + options.successRedirect : null,
            enableOriginRedirect: options.enableOriginRedirect,
            tokenField: options.tokenField,
            uidField: options.uidField,
            allowPost: options.allowPost
        });

        middleware(req, res, next);
    },
    restricted: (options) => (req, res, next) => {

        const middleware = passwordless.restricted({
            failureRedirect: options.failureRedirect?
                req.baseUrl + options.failureRedirect : null,
            originField: options.originField
        });

        middleware(req, res, next);
    }
};
