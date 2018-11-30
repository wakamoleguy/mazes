module.exports = {
  browseByParticipant(userId, challengeRepo) {
    const challengesSent = challengeRepo.browseByChallenger(userId)
    const challengesReceived = challengeRepo.browseByChallenged(userId)

    return Promise.all([challengesSent, challengesReceived]).then((result) => ({
      sent: result[0],
      received: result[1]
    }))
  },

  create(
    challengingUserId,
    challengedUserId,
    challengingMazeId,
    challengeRepo
  ) {
    return challengeRepo.add({
      challengingUser: challengingUserId,
      challengedUser: challengedUserId,
      challengingMaze: challengingMazeId
    })
  },

  accept(challengeId, mazeId, challengeRepo) {
    return challengeRepo.updateAccept(challengeId, mazeId)
  },

  readRunMaze(challengeId, userId, challengeRepo, mazeRepo) {
    return challengeRepo.read(challengeId).then((challenge) => {
      if (!challenge) {
        throw new Error('No challenge found')
      }

      if (challenge.challengingUser.id === userId) {
        // User is challenger
        return mazeRepo.read(challenge.challengedMaze)
      } else if (challenge.challengedUser.id === userId) {
        // User is challenged
        return mazeRepo.read(challenge.challengingMaze)
      } else {
        throw new Error('User is not associated with the challenge')
      }
    })
  },

  postTime(userId, challengeId, time, challengeRepo) {
    return challengeRepo.read(challengeId).then((challenge) => {
      if (!challenge) {
        throw new Error('No challenge found')
      }

      if (challenge.challengingUser.id === userId) {
        // User is challenger
        return challengeRepo.updateChallengingTime(challengeId, time)
      } else if (challenge.challengedUser.id === userId) {
        // User is challenged
        return challengeRepo.updateChallengedTime(challengeId, time)
      } else {
        throw new Error('User posted to challenge that is not theirs')
      }
    })
  }
}
