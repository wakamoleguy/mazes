const express = require('express');

module.exports = function (app) {

    app.get('/', (req, res) => {
        res.redirect(307, '/maze/');
    })

    app.get('/maze/:maze/', (req, res) => {
        res.sendFile('editor.html', { root: __dirname + '/private' });
    });

    app.use('/maze/', express.static(__dirname + '/public'));
};
