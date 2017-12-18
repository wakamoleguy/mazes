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
        },

        add(newChallenge) {

            return new Promise((resolve) => {

                const id = Object.values(data.challenges).length;

                const newChallenges = { ...data.challenges };
                newChallenges[id] = newChallenge;

                const newData = {
                    users: data.users,
                    mazes: data.mazes,
                    challenges: newChallenges
                };

                resolve(createRepo(newData));
            });
        }
    };
}

module.exports = createRepo(INITIAL_DATA);
