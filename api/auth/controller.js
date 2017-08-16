exports.login = function (req, res) {
  if (req.session.user) {
    res.sendStatus(400);
  } else if (req.params.user) {
    req.session.user = req.params.user;
    res.sendStatus(204);
  } else if (req.query.user) {
    req.session.user = req.query.user;
    res.sendStatus(204);
  } else {
    res.sendStatus(400);
  }
};
