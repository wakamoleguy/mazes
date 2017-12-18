const repository = {

    browseByChallenger(userId) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            models.Challenge.
                find({
                    challengingUser: userId
                }).
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
    }

};

module.exports = repository;
