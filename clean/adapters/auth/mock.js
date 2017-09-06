const passwordless = require('passwordless');
const session = require('express-session');

const memstore = {

    tokens: {},

    authenticate(token, uid, callback) {

        const item = this.tokens[uid];

        if (item === undefined) {
            return callback(null, false, null);
        }

        if (item.token === token) {
            return callback(null, true, item.originUrl);
        }

        return callback(null, false, null);
    },

    storeOrUpdate(token, uid, msToLive, originUrl, callback) {

        const item = {
            token,
            uid,
            originUrl
        };

        this.tokens[uid] = item;

        callback();
    },

    invalidateUser(uid, callback) {

        delete this.tokens[uid];
        callback();
    },

    clear(callback) {

        this.tokens = {};
        callback();
    },

    length(callback) {

        const length = Object.keys(this.tokens).length;
        if (callback) {
            callback(null, length);
        }
        return length;
    }
};

passwordless.init(memstore);

passwordless.addDelivery((token, uid, recipient, callback) => {
    setTimeout(callback, 0);
});

module.exports = {

    store: memstore,

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
    acceptToken: passwordless.acceptToken.bind(passwordless),
    restricted: passwordless.restricted.bind(passwordless)
};
