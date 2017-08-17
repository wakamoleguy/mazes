const maze = require('./maze/controller');
const user = require('./user/controller');

const passwordless = require('passwordless');

module.exports = function (app) {

    app.get('/', (req, res) => {
        res.send('Hello');
    });

    app.get('/user/', user.browse);
    app.post('/user/', user.add);
    app.delete('/user/:id', user.delete);

    app.get('/maze/', maze.browse);
    app.get('/maze/:id', maze.read);
    app.put('/maze/:id', maze.edit);
    app.post('/maze/', maze.add);
    app.delete('/maze/:id', maze.delete);


}
