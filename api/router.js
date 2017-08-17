const auth = require('./auth/controller');
const maze = require('./maze/controller');
const user = require('./user/controller');

const passwordless = require('passwordless');

module.exports = function (app) {

    app.get('/', (req, res) => {
        res.send('Hello');
    });

    app.post('/auth/', passwordless.requestToken(
        // Turn the email address into a user ID
        function (user, delivery, callback, req) {
            callback(null, user);
        },
        { originField: 'origin' }
    ), function (req, res) {
        res.send('sent');
    });

    app.get('/auth/',
        passwordless.acceptToken({ enableOriginRedirect: true }),
        auth.accepted);


    app.use(passwordless.restricted());

    app.get('/user/', user.browse);
    app.post('/user/', user.add);
    app.delete('/user/:id', user.delete);

    app.get('/maze/', maze.browse);
    app.get('/maze/:id', maze.read);
    app.put('/maze/:id', maze.edit);
    app.post('/maze/', maze.add);
    app.delete('/maze/:id', maze.delete);


}
