const repository = {

    browseByChallenger(userId) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            models.Challenge.
                find({
                    challengingUser: userId
                }).
                populate('challengingUser').
                populate('challengedUser').
                populate('challengingMaze').
                populate('challengedMaze').
                find((err, challenges) => {

                    if (err) {

                        reject(err);
                    } else {

                        resolve(challenges.map((challenge) => ({
                            id: challenge._id,
                            challengingUser: challenge.challengingUser,
                            challengedUser: challenge.challengedUser,
                            challengingMaze: challenge.challengingMaze,
                            challengedMaze: challenge.challengedMaze,
                            challengingTime: challenge.challengingTime,
                            challengedTime: challenge.challengedTime
                        })));
                    }
                });
        }));
    },

    browseByChallenged(userId) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            models.Challenge.
                find({
                    challengedUser: userId
                }).
                populate('challengingUser').
                populate('challengedUser').
                populate('challengingMaze').
                populate('challengedMaze').
                find((err, challenges) => {

                    if (err) {

                        reject(err);
                    } else {

                        resolve(challenges.map((challenge) => ({
                            id: challenge._id,
                            challengingUser: challenge.challengingUser,
                            challengedUser: challenge.challengedUser,
                            challengingMaze: challenge.challengingMaze,
                            challengedMaze: challenge.challengedMaze,
                            challengingTime: challenge.challengingTime,
                            challengedTime: challenge.challengedTime
                        })));
                    }
                });
        }));
    },

    read(challengeId) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            models.Challenge.
                findById(challengeId).
                populate('challengingUser').
                populate('challengedUser').
                populate('challengingMaze').
                populate('challengedMaze').
                findOne((err, challenge) => {

                    if (err) {

                        reject(err);
                    } else if (!challenge) {

                        resolve(null);
                    } else {

                        resolve({
                            id: challenge._id,
                            challengingUser: challenge.challengingUser,
                            challengedUser: challenge.challengedUser,
                            challengingMaze: challenge.challengingMaze,
                            challengedMaze: challenge.challengedMaze,
                            challengingTime: challenge.challengingTime,
                            challengedTime: challenge.challengedTime
                        });
                    }
                });
        }));
    },

    add(challenge) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            new models.Challenge({
                challengingUser: challenge.challengingUser,
                challengedUser: challenge.challengedUser,
                challengingMaze: challenge.challengingMaze,
                challengedMaze: null,
                challengingTime: null,
                challengedTime: null
            }).save((err) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(repository);
                }
            });
        }));
    },

    updateAccept(challengeId, mazeId) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            models.Challenge.
                findById(challengeId).
                findOne((err, challenge) => {

                    if (err) {

                        reject(err);

                    } else if (
                        challenge === null ||
                        challenge === undefined
                    ) {

                        reject('Challenge not found');

                    } else if (
                        challenge.challengedMaze !== null &&
                        challenge.challengedMaze !== undefined
                    ) {

                        reject('Cannot update challenge: Already accepted');

                    } else {

                        challenge.update({
                            challengedMaze: mazeId
                        }, (updateErr) => {

                            if (updateErr) {

                                reject(updateErr);
                            } else {

                                resolve(repository);
                            }
                        });
                    }
                });
        }));
    },

    updateChallengingTime(challengeId, time) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            models.Challenge.
                findById(challengeId).
                findOne((err, challenge) => {

                    if (err) {

                        reject(err);

                    } else if (
                        challenge === null ||
                        challenge === undefined
                    ) {

                        reject('Challenge not found');

                    } else if (
                        !challenge.challengingMaze ||
                        !challenge.challengedMaze
                    ) {

                        reject('Cannot update challenge: Not ready to run');

                    } else if (challenge.challengingTime) {

                        reject('Cannot update challenge: Already run');

                    } else {

                        challenge.update({
                            challengingTime: time
                        }, (updateErr) => {

                            if (updateErr) {

                                reject(updateErr);
                            } else {

                                resolve(repository);
                            }
                        });
                    }
                });
        }));
    },

    updateChallengedTime(challengeId, time) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            models.Challenge.
                findById(challengeId).
                findOne((err, challenge) => {

                    if (err) {

                        reject(err);

                    } else if (
                        challenge === null ||
                        challenge === undefined
                    ) {

                        reject('Challenge not found');

                    } else if (
                        !challenge.challengingMaze ||
                        !challenge.challengedMaze
                    ) {

                        reject('Cannot update challenge: Not ready to run');

                    } else if (challenge.challengedTime) {

                        reject('Cannot update challenge: Already run');

                    } else {

                        challenge.update({
                            challengedTime: time
                        }, (updateErr) => {

                            if (updateErr) {

                                reject(updateErr);
                            } else {

                                resolve(repository);
                            }
                        });
                    }
                });
        }));
    }

};

module.exports = repository;
