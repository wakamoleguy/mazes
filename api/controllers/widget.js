const models = require('../models/models');

exports.browse = function (req, res) {

    models.Widget.
        find({}).
        find((err, widgets) => {

            if (err) {
                console.error(err);
            } else {
                res.send(widgets);
            }
        });
};

exports.read = function (req, res) {

    models.Widget.
        findById(req.params.id).
        findOne((err, widget) => {

            if (err) {
                console.error(err);
            } else {
                res.send(widget);
            }
        });
};

exports.edit = function (req, res) {

    models.Widget.
        findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email
        }, (err, widget) => {

            if (err) {
                console.error(err);
            } else {
                res.send('OK');
            }
        });
};

exports.add = function (req, res) {

    const widget = new models.Widget({
        name: req.body.name,
        value: parseInt(req.body.value, 10)
    });

    widget.save((err, w) => {
        if (err) {
            console.error(err);
        } else {
            res.send(201, w);
        }
    });
};

exports.delete = function (req, res) {

    models.Widget.
        findById(req.params.id).
        remove((err) => {

            if (err) {
                console.error(err);
            } else {
                res.send(204);
            }
        });
};
