exports.login = function (req, res) {

  if (req.session.user) {

    res.sendStatus(403);

  } else if (req.body.user) {

    req.session.user = req.body.user;
    res.sendStatus(200);

  } else {

    res.sendStatus(400);
  }
};
