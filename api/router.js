const auth = require('./auth/controller');
const maze = require('./maze/controller');
const user = require('./user/controller');

module.exports = function (app) {

    app.get('/', (req, res) => {
        res.send('Hello');
    });

    app.post('/auth/', auth.login);


    app.use((req, res, next) => {
      if (!req.session.user) {
        res.sendStatus(403);
      } else {
        next();
      }
    });


    app.get('/user/', user.browse);
    app.put('/user/:id', user.add);
    app.delete('/user/:id', user.delete);

    app.get('/maze/', maze.browse);
    app.get('/maze/:id', maze.read);
    app.put('/maze/:id', maze.edit);
    app.post('/maze/', maze.add);
    app.delete('/maze/:id', maze.delete);


}
