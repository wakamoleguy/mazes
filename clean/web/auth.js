const Router = require('express').Router;
const session = require('express-session');

module.exports = function Auth(authDriver) {

    const router = Router();

    router.use(authDriver.support());

    /*
    * Authentication routes
    */
    router.post('/auth/', authDriver.requestToken(
        // Turn the email address into a user ID
        function (user, delivery, callback, req) {
            callback(null, user);
        }, {
            originField: 'origin'
        }
    ), function (req, res) {
        res.redirect(302, '/login/pending/');
    });

    router.get('/auth/', authDriver.acceptToken({
        enableOriginRedirect: true
    }), (req, res) => {
        // We land here if there wasn't an origin redirect.
        res.sendStatus(200);
    });

    /*
    * Other routes that are restricted
    */
    router.use('/app/', authDriver.restricted({
        failureRedirect: '/login/',
        originField: 'origin'
    }));
    router.use('/api/', authDriver.restricted());

    // Return the router so the main express app can connect it.
    return router;
}
