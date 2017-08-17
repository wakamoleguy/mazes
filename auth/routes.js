const express = require('express');
const passwordless = require('passwordless');

const router = express.Router();

/*
 * Authentication routes
 */
router.post('/auth/', passwordless.requestToken(
    // Turn the email address into a user ID
    function (user, delivery, callback, req) {
        callback(null, user);
    }, {
        originField: 'origin'
    }
), function (req, res) {
    res.redirect(302, '/login/pending/');
});

router.get('/auth/', passwordless.acceptToken({
    enableOriginRedirect: true
}));

/*
 * Other routes that are restricted
 */
router.use('/app/', passwordless.restricted({
    failureRedirect: '/login/',
    originField: 'origin'
}));
router.use('/api/', passwordless.restricted());

/*
 * Export the router directly for use
 */
module.exports = router;
