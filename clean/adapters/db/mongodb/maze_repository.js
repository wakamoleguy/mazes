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

    browseByCreatorEmail(email) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            // Should this live in user_repository?
            models.User.
                findOne({ email }).find((err, users) => {

                    if (err) {
                        return reject(err);
                    }

                    if (users.length === 0) {
                        return reject(new Error('No such user'));
                    }

                    models.Maze.
                        find({
                            creator: users[0]._id
                        }).
                        find((mazeErr, mazes) => {

                            if (err) {
                                reject(err);
                            } else {
                                resolve(mazes);
                            }
                        });
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
                }).save((err) => {

                    if (err) {
                        reject (err);
                    } else {
                        resolve();
                    }
                });
            }));
        },

        update(id, mazeId, version, start, destination, map) {

            const connect = require('./connect');

            return connect.then((models) => new Promise((resolve, reject) => {

                models.Revision.update({
                    _id: id
                }, {
                    maze: mazeId,
                    version,
                    start,
                    destination,
                    map
                }, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }));
        },

        browseLatestByCreatorEmail(email) {

            const connect = require('./connect');
            const getMazes = repository.browseByCreatorEmail(email);

            return Promise.all([connect, getMazes]).then((results) => {

                const models = results[0];
                const mazes = results[1];

                const getRevisionsByMaze = Promise.all(
                    mazes.map((maze) => new Promise((resolve, reject) => {

                        models.Revision.
                            find({
                                maze: maze._id
                            }).
                            populate('maze').
                            find((err, revisions) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(revisions);
                                }
                            });
                    }))
                );

                // Flatten each maze's revisions to just the latest one.
                return getRevisionsByMaze.then((revisionsByMaze) =>

                    // revisionsByMaze is a list of revision lists
                    revisionsByMaze.map(
                        (revisions) => revisions.reduce(
                            (latest, revision) =>
                                revision.version > latest.version?
                                    revision:
                                    latest,
                            { version: -1 }))
                );
            });

        },

        readLatestMazeRevision(mazeId) {

            const connect = require('./connect');

            const getRevisions = connect.
                then((models) => new Promise((resolve, reject) => {

                    models.Revision.
                        find({
                            maze: mazeId
                        }).
                        populate('maze').
                        find((err, revisions) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(revisions);
                            }
                        });
                }));

            return getRevisions.then((revisions) =>
                revisions.reduce(
                    (latest, revision) =>
                        revision.version > latest.version?
                            revision:
                            latest,
                    { version: -1 }));
        }// ,
        //
        // read(revisionId) {
        //     throw new Error('Unimplemented');
        // }
    }
};

module.exports = repository;
