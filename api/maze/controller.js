const models = require('./models');

exports.browse = function (req, res) {

    // Validate
    const user = req.user;
    // TODO - what if there isn't one? This shouldn't happen.

    models.Maze.
        find({
            // Authorize
            creator: user
        }).
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

    const user = req.user;

    models.Maze.
        findOne({
            _id: req.params.id,
            creator: user
        }, (err, maze) => {

            if (err) {
                console.error(err);
            } else {

                maze.name = req.body.name;
                maze.size = req.body.size;
                maze.start = req.body.start;
                maze.destination = req.body.destination;
                maze.map = req.body.map;

                maze.save((err, updatedMaze) => {
                    if (err) {
                        console.error(err);
                        res.sendStatus(500);
                    } else {
                        res.send(updatedMaze);
                    }
                });
            }
        });
};

exports.add = function (req, res) {

    const maze = new models.Maze({
        name: req.body.name,
        size: req.body.size,
        start: req.body.start,
        destination: req.body.destination,
        map: req.body.map,
        creator: req.user
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
        findOne({
            _id: req.params.id,
            creator: req.user
        }).
        remove((err) => {

            if (err) {
                console.error(err);
            } else {
                res.sendStatus(204);
            }
        });
};
