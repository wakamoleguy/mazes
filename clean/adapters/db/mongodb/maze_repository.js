// Instead of requiring once at the top, we require connect in each repository
// call. This allows us to defer connecting to MongoDB until the first use,
// cleaning up our test output.
// const connect = require('./connect');

const repository = {

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

    add(id, size, creatorId, name, revisions) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            new models.Maze({
                _id: id,
                name,
                creator: creatorId,
                size
            }).save((err, maze) => {

                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        })).then(() => {

            // Save revisions
            return Promise.all(
                revisions.map((revision) => repository.revision.add(
                    revision.id,
                    id, // mazeId
                    revision.version,
                    revision.start,
                    revision.destination,
                    revision.map
                ))
            ).then(() => {}); // Return undefined rather than an array
        });
    },

    revision: {

        add(id, mazeId, version, start, destination, map) {

            const connect = require('./connect');

            return connect.then((models) => new Promise((resolve, reject) => {

                new models.Revision({
                    _id: id,
                    maze: mazeId,
                    version,
                    start,
                    destination,
                    map
                }).save((err, revision) => {

                    if (err) {
                        reject (err);
                    } else {
                        resolve();
                    }
                });
            }));
        }
    }
};

module.exports = repository;
