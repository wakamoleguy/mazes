module.exports = {

    browseByParticipant(userId, challengeRepo) {

        const challengesSent = challengeRepo.browseByChallenger(userId);
        const challengesReceived = challengeRepo.browseByChallenged(userId);

        return Promise.all([challengesSent, challengesReceived]).
            then((result) => ({
                sent: result[0],
                received: result[1]
            }));
    }
};
