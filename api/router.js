const widget = require('./controllers/widget');
const maze = require('./controllers/maze');

module.exports = function (app) {

    app.get('/', (req, res) => {
        res.send('<a href="/widget/">Widgets</a> <a href="/maze/">Mazes</a>');
    });

    app.get('/widget/', widget.browse);
    app.get('/widget/:id', widget.read);
    app.put('/widget/:id', widget.edit);
    app.post('/widget/', widget.add);
    app.delete('/widget/:id', widget.delete);


    app.get('/maze/', maze.browse);
    app.get('/maze/:id', maze.read);
    app.put('/maze/:id', maze.edit);
    app.post('/maze/', maze.add);
    app.delete('/maze/:id', maze.delete);


}
