module.exports = {

    browseByParticipant(userId, challengeRepo) {

        const challengesSent = challengeRepo.browseByChallenger(userId);
        const challengesReceived = challengeRepo.browseByChallenged(userId);

        return Promise.all([challengesSent, challengesReceived]).
            then((result) => ({
                sent: result[0],
                received: result[1]
            }));
    },

    create(
        challengingUserId,
        challengedUserId,
        challengingMazeId,
        challengeRepo) {

        return challengeRepo.add({
            challengingUser: challengingUserId,
            challengedUser: challengedUserId,
            challengingMaze: challengingMazeId
        });
    }
};
