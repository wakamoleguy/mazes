const express = require('express');

module.exports = function (app) {

    app.get('/', (req, res) => {
        res.redirect(307, '/maze/');
    })

    app.use('/maze/:maze/edit', express.static(__dirname + '/editor'));
    app.use('/maze/:maze/run', express.static(__dirname + '/runner'));

    app.use('/maze/', express.static(__dirname + '/public'));
};
