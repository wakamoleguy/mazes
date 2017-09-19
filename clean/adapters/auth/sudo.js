const session = require('express-session');

module.exports = {

    support() {

        return [
            session({
                secret: 'fixme secret',
                cookie: { maxAge: 60 * 60 * 1000 },
                resave: false, // TODO - Check this option when using prod store
                saveUninitialized: false
            })
        ];
    },

    requestToken: () => (req, res, next) => next(),
    acceptToken: () => (req, res, next) => next(),
    restricted: () => (req, res, next) => {
        req.user = 'wakamoleguy@gmail.com';
        next();
    }
};
