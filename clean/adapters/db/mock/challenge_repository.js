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

                const challenge = challenges.find((c) => c.id === challengeId);

                if (!challenge) {
                    resolve(null);
                }

                const users = Object.values(data.users);

                const challengingUser = users.find(
                    (u) => u.id === challenge.challengingUser);
                const challengedUser = users.find(
                    (u) => u.id === challenge.challengedUser);

                resolve({
                    ...challenge,
                    challengingUser,
                    challengedUser
                });
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
        },

        updateChallengingTime(challengeId, time) {

            return new Promise((resolve, reject) => {

                const challenges = Object.values(data.challenges);

                const challengeToUpdate = challenges.find(
                    (challenge) => challenge.id === challengeId
                );

                if (!challengeToUpdate) {

                    reject('No challenge found to update');

                } else if (challengeToUpdate.challengingTime !== null) {

                    reject('Challenge has already been first-run');

                } else if (
                    challengeToUpdate.challengingMaze === null ||
                    challengeToUpdate.challengedMaze === null
                ) {

                    reject('Tried to run a challenge with no maze to run');

                } else {

                    const newChallenge = {
                        ...challengeToUpdate,
                        challengingTime: time
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
        },

        updateChallengedTime(challengeId, time) {

            return new Promise((resolve, reject) => {

                const challenges = Object.values(data.challenges);

                const challengeToUpdate = challenges.find(
                    (challenge) => challenge.id === challengeId
                );

                if (!challengeToUpdate) {

                    reject('No challenge found to update');

                } else if (challengeToUpdate.challengedTime !== null) {

                    reject('Challenge has already been first-run');

                } else if (
                    challengeToUpdate.challengingMaze === null ||
                    challengeToUpdate.challengedMaze === null
                ) {

                    reject('Tried to run a challenge with no maze to run');

                } else {

                    const newChallenge = {
                        ...challengeToUpdate,
                        challengedTime: time
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
