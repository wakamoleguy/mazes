const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

module.exports = (authDriver) => {

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(authDriver.support());

    app.get('/login/', (req, res) => {

        if (req.user) {
            res.redirect(app.mountpath + '/');
        } else {
            res.sendFile(__dirname + '/login/index.html');
        }
    });

    app.get('/login/pending/', (req, res) => {
        res.sendFile(__dirname + '/login/pending/index.html');
    });

    app.post('/login/request/', authDriver.requestToken(
        // Turn the email address into a user ID
        function (user, delivery, callback) {
            callback(null, user);
        }, {
            originField: 'origin'
        }
    ), function (req, res) {
        res.redirect(302, req.baseUrl + '/login/pending/');
    });

    app.get('/login/request/', (req, res) => res.sendStatus(403));

    app.get('/login/accept/', authDriver.acceptToken({

        enableOriginRedirect: true,
        successRedirect: '/'
    }), (req, res) => {

        // We land here if the validation failed
        if (req.user) {
            // You're already logged in, so just go somewhere.
            res.redirect(req.baseUrl + '/');
        } else {
            res.sendStatus(401);
        }
    });

    app.use(authDriver.restricted({
        failureRedirect: '/login/',
        originField: 'origin'

    }), router);

    return app;

}
