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
    }

};

module.exports = repository;
