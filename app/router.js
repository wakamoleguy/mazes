const express = require('express');
const passwordless = require('passwordless');

module.exports = function (app) {

  app.use('/login/', express.static(__dirname + '/login'));

  app.use((req, res, next) => {
      passwordless.restricted({
          failureRedirect: req.baseUrl + '/login/'
      })(req, res, next);
  });

  app.get('/', (req, res) => {
    res.redirect(307, 'maze/');
  });

  app.use('/maze/:maze/edit', express.static(__dirname + '/editor'));
  app.use('/maze/:maze/run', express.static(__dirname + '/runner'));

  app.use('/maze/', express.static(__dirname + '/public'));
};
