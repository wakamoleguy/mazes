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
                            name: maze.name,
                            creator: maze.creator,
                            size: maze.size,
                            revisions: maze.revisions
                        })));
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

                        resolve({
                            id: maze._id,
                            name: maze.name,
                            creator: maze.creator,
                            size: maze.size,
                            revisions: maze.revisions
                        });
                    }
                });
        }));
    },

    updateMap(mazeId, newMap) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            models.Revision.
                find({
                    maze: mazeId
                }).
                populate('maze').
                find((err, revisions) => {

                    if (err) {

                        reject(err);
                    } else {

                        const latest = revisions.
                            sort((a, b) => b.version - a.version)[0];

                        const maze = latest.maze;

                        if (
                            newMap.length !== maze.size ||
                            newMap.some((row) => row.length !== maze.size)
                        ) {

                            reject('Bad size for newMap');
                        } else {

                            latest.update({ map: newMap }, (err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve();
                                }
                            });
                        }
                    }
                });
        }));
    },

    add(newMaze) {

        const connect = require('./connect');

        return connect.then((models) => {

            const revisionIds = newMaze.revisions.map(
                (newRevision) => new Promise((resolve, reject) => {

                    new models.Revision({
                        _id: newRevision.id,
                        maze: newRevision.maze,
                        version: newRevision.version,
                        start: newRevision.start,
                        destination: newRevision.destination,
                        map: newRevision.map
                    }).save((err, revision) => {

                        if (err) {
                            reject(err);
                        } else {
                            resolve(revision._id);
                        }
                    });
                })
            );

            return Promise.all(revisionIds).then(
                (revisionIds) => new Promise((resolve, reject) => {

                    new models.Maze({
                        _id: newMaze.id,
                        name: newMaze.name,
                        size: newMaze.size,
                        creator: newMaze.creator,
                        revisions: revisionIds
                    }).save((err) => {

                        if (err) {
                            reject(err);
                        } else {
                            resolve(repository);
                        }
                    });
                }));
        });
    }
};

module.exports = repository;
