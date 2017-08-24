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
        creator: req.user
    });

    maze.save((err, savedMaze) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }

        const firstDraft = new models.Revision({
            maze: savedMaze._id,
            start: { z: 1, x: 1, destination: 'east' },
            destination: { z: 11, x: 1 },
            version: 0,
            map: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        });

        firstDraft.save((err, savedDraft) => {
            if (err) {
                console.error(err);
            } else {
                savedMaze.revisions = [savedDraft._id];
                savedMaze.save();
                res.sendStatus(201);
            }
        });
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

exports.revision = {

    read(req, res) {

        models.Revision.
        findOne({
            maze: req.params.maze,
            version: req.params.id
        }).
        populate('maze').
        findOne((err, revision) => {

            if (err) {
                console.error(err);
            } else {
                res.send(revision);
            }
        });
    },

    add(req, res) {

        models.Maze.
        findById(req.params.maze, (err, maze) => {
            if (err) {
                console.error(err);
            }

            const revision = new models.Revision({
                maze: maze._id,
                start: req.body.start,
                destination: req.body.destination,
                map: req.body.map,
                version: req.params.id
            });

            revision.save((err, savedRevision) => {
                maze.revisions.push(savedRevision._id);
                maze.save();
                res.sendStatus(201);
            });
        });
    },

    delete(req, res) {

    }
};
