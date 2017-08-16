const express = require('express');

module.exports = function (app) {

  // Authenticate?
  app.use((req, res, next) => {

    if (!req.session.user && req.path !== "/login/") {
      console.log('User', req.session.user, 'Path', req.path);
      res.redirect(307, req.baseUrl + "/login/");
    } else {
      next();
    }
  });

  app.get('/', (req, res) => {
    res.redirect(307, 'maze/');
  })

  app.use('/login/', express.static(__dirname + '/login'));

  app.use('/maze/:maze/edit', express.static(__dirname + '/editor'));
  app.use('/maze/:maze/run', express.static(__dirname + '/runner'));

  app.use('/maze/', express.static(__dirname + '/public'));
};
