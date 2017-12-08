// Instead of requiring once at the top, we require connect in each repository
// call. This allows us to defer connecting to MongoDB until the first use,
// cleaning up our test output.
// const connect = require('./connect');

const repository = {

    dump() {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            models.Maze.find({}, (err, mazes) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(mazes);
                }
            });
        }));
    },

    browseByCreator(userId) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            models.Maze.
                find({
                    creator: userId
                }).
                populate('revisions').
                find((err, mazes) => {

                    if (err) {

                        reject(err);
                    } else {

                        resolve(mazes.map((maze) => ({
                            id: maze._id,
                            creator: maze.creator,
                            size: maze.size,
                            revisions: maze.revisions
                        })));
                    }
                });
        }));
    },

    browse(userId) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            models.Maze.
                find({
                    creator: userId
                }).
                find((err, mazes) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(mazes);
                    }
                });
        }));
    },

    read(mazeId) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            models.Maze.
                findById(mazeId).
                populate('revisions')
                .findOne((err, maze) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(maze);
                    }
                });
        }));
    },

    // Older methods are kept below here

    add(id, size, creatorId, name, revisions) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            new models.Maze({
                _id: id,
                name,
                creator: creatorId,
                size
            }).save((err) => {

                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        })).then(() => Promise.all(
            revisions.map((revision) => repository.revision.add(
                revision.id,
                id, // mazeId
                revision.version,
                revision.start,
                revision.destination,
                revision.map
            ))
        )).then(() => {}); // Return undefined rather than an array
    }
};

module.exports = repository;
