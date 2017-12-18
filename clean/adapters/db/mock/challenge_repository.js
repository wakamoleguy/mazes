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

        read(challengeId) {

            return new Promise((resolve) => {

                const challenges = Object.values(data.challenges);

                resolve(challenges.find((c) => c.id === challengeId) || null);
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
        },

        updateAccept(challengeId, mazeId) {

            return new Promise((resolve, reject) => {

                const challenges = Object.values(data.challenges);

                const challengeToUpdate = challenges.find(
                    (challenge) => challenge.id === challengeId
                );

                if (!challengeToUpdate) {

                    reject('No challenge found to update');

                } else if (challengeToUpdate.challengedMaze !== null) {

                    reject('Challenge has already been accepted');

                } else {

                    const newChallenge = {
                        ...challengeToUpdate,
                        challengedMaze: mazeId
                    };

                    const newChallenges = {
                        ...data.challenges,
                        [newChallenge.id]: newChallenge
                    };

                    const newData = {
                        users: data.users,
                        mazes: data.mazes,
                        challenges: newChallenges
                    };

                    resolve(createRepo(newData));
                }


            });
        }
    };
}

module.exports = createRepo(INITIAL_DATA);
