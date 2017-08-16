exports.login = function (req, res) {
  console.log('logging in?', req.params, req.query);
  if (req.session.user) {
    console.log('Already in a session for', req.session.user);
    res.sendStatus(400);
  } else if (req.body.user) {
    req.session.user = req.body.user;
    res.sendStatus(204);
  } else if (req.query.user) {
    req.session.user = req.query.user;
    res.sendStatus(204);
  } else {
    console.log('Unspecified error');
    res.sendStatus(400);
  }
};
