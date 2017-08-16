const model = require('./model');

exports.browse = function (req, res) {

  // Authenticate
  if (!req.session.user) {
    res.sendStatus(401);
  } else {
    res.send(req.session.user);
  }

  // Validate

  // Execute

  // View
};
