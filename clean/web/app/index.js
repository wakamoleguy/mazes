const express = require('express');
const bodyParser = require('body-parser');
//const router = require('./router');

module.exports = (authDriver) => {

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(authDriver.support());

    app.get('/login/', (req, res) => {

        if (req.user) {
            res.redirect('foo/');
        } else {
            res.sendStatus(200);
        }
    });

    app.post('/login/request/', authDriver.requestToken(
        // Turn the email address into a user ID
        function (user, delivery, callback) {
            callback(null, user);
        }, {
            originField: 'origin'
        }
    ), function (req, res) {
        res.redirect(302, 'login/pending/');
    });

    app.get('/login/request/', (req, res) => res.sendStatus(403));

    app.get('/login/accept/', authDriver.acceptToken({
        enableOriginRedirect: true,
        successRedirect: 'foo/'
    }), (req, res) => {
        // We land here if the validation failed
        if (req.user) {
            // You're already logged in, so just go somewhere.
            res.redirect('foo/');
        } else {
            res.sendStatus(401);
        }
    });

    app.use(authDriver.restricted({
        failureRedirect: 'login/',
        originField: 'origin'
    }));

    return app;

    //router(app);

    //
    // /*
    // * Authentication routes
    // */
    // router.post('/auth/', passwordless.requestToken(
    //     // Turn the email address into a user ID
    //     function (user, delivery, callback, req) {
    //         callback(null, user);
    //     }, {
    //         originField: 'origin'
    //     }
    // ), function (req, res) {
    //     res.redirect(302, '/login/pending/');
    // });
    //
    // router.get('/auth/', passwordless.acceptToken({
    //     enableOriginRedirect: true
    // }), (req, res) => {
    //     // We land here if there wasn't an origin redirect.
    //     res.sendStatus(200);
    // });
    //
    // /*
    // * Other routes that are restricted
    // */
    // router.use('/app/', passwordless.restricted({
    //     failureRedirect: '/login/',
    //     originField: 'origin'
    // }));
    // router.use('/api/', passwordless.restricted());

}
