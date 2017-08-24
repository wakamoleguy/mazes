const model = require('./model');

exports.browse = function (req, res) {

    // Authenticate
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    // Validate
    // The rest of the request is ignored. We just do users

    // Execute
    model.User.
    findById(req.user).
    findOne((err, user) => {

        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.send([user]);
        }
    });

    // View
    // Uh, we sent the request up there already. :-(
};

exports.add = function (req, res) {

    // Authenticate

    // Validate
    const email = req.user;
    const display = req.body.display || email;
    // TODO - validate email format

    // Execute
    const user = new model.User({
        display,
        email,
        _id: email
    });

    user.save((err, u) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.status(201).send(u);
        }
    });

}

exports.delete = function (req, res) {

    model.User.
    findById(req.params.id).
    remove((err) => {

        if (err) {
            console.error(err);
        } else {
            res.sendStatus(204);
        }
    });
}
