const INITIAL_DATA = require('./data');

function createRepo(data) {

    return {

        browseByChallenger(userId) {

            return new Promise((resolve) => {

                const challenges = Object.values(data.challenges);

                resolve(challenges.filter((c) => c.challengingUser === userId));
            });
        },

        browseByChallenged(userId) {

            return new Promise((resolve) => {

                const challenges = Object.values(data.challenges);

                resolve(challenges.filter((c) => c.challengedUser === userId));
            });
        }
    };
}

module.exports = createRepo(INITIAL_DATA);
