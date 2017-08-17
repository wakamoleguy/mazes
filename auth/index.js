const express = require('express');
const session = require('express-session');
const passwordless = require('passwordless');

require('./passwordless-init');
const routes = require('./routes');

const router = express.Router();
router.use(session({
    secret: 'fixme secret',
    cookie: { maxAge: 60 * 60 * 1000 }
}));
router.use(passwordless.sessionSupport());
router.use(routes);

module.exports = router;
