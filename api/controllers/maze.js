const models = require('../models/models');

exports.browse = function (req, res) {

    models.Maze.
        find({}).
        find((err, mazes) => {

            if (err) {
                console.error(err);
            } else {
                res.send(mazes);
            }
        });
};

exports.read = function (req, res) {

    models.Maze.
        findById(req.params.id).
        findOne((err, maze) => {

            if (err) {
                console.error(err);
            } else {
                res.send(maze);
            }
        });
};

exports.edit = function (req, res) {

    models.Maze.
        findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            size: req.body.size,
            start: req.body.start,
            destination: req.body.destination,
            map: req.body.map
        }, (err, maze) => {

            if (err) {
                console.error(err);
            } else {
                res.send('OK');
            }
        });
};

exports.add = function (req, res) {

    const maze = new models.Maze({
        name: req.body.name,
        size: req.body.size,
        start: req.body.start,
        destination: req.body.destination,
        map: req.body.map
    });

    maze.save((err, w) => {
        if (err) {
            console.error(err);
        } else {
            res.send(201, w);
        }
    });
};

exports.delete = function (req, res) {

    models.Maze.
        findById(req.params.id).
        remove((err) => {

            if (err) {
                console.error(err);
            } else {
                res.send(204);
            }
        });
};
