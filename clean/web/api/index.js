const maze = require('./maze/controller');
const revision = require('./revision/controller');
const user = require('./user/controller');

const express = require('express');

const app = express();

// FIXME - remove this
app.get('/', (req, res) => {
    res.send('Hello from the API');
});

app.get('/user/', user.browse);
app.post('/user/', user.add);
app.delete('/user/:id', user.delete);

app.get('/maze/', maze.browse);
app.get('/maze/:id', maze.read);
app.put('/maze/:id', maze.edit);
app.post('/maze/', maze.add);
app.delete('/maze/:id', maze.delete);

app.get('/maze/:maze/revision/:id', revision.read);
app.put('/maze/:maze/revision/:id', revision.add);

module.exports = app;
