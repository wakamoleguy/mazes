const repo = require('./challenge_repository');

describe('Mock challenge repository', () => {

    describe('browseByChallenger', () => {

        it('should resolve to a list of challenges if user exists', (done) => {

            repo.browseByChallenger('id:001').then((challenges) => {

                expect(challenges).toBeDefined();
                expect(challenges.length).toBe(5);
                done();
            }).catch(done.fail);
        });

        it('should resolve to an empty list if user has none', (done) => {

            repo.browseByChallenger('id:002').then((challenges) => {

                expect(challenges).toEqual([]);
                done();
            }).catch(done.fail);
        });

        it('should resolve to an empty list if user does not exist', (done) => {

            repo.browseByChallenger('id:foobar').then((challenges) => {

                expect(challenges).toEqual([]);
                done();
            }).catch(done.fail);
        });
    });

    describe('browseByChallenged', () => {

        it('should resolve to a list of challenges if user exists', (done) => {

            repo.browseByChallenged('id:003').then((challenges) => {

                expect(challenges).toBeDefined();
                expect(challenges.length).toBe(3);
                done();
            }).catch(done.fail);
        });

        it('should resolve to an empty list if user has none', (done) => {

            repo.browseByChallenged('id:001').then((challenges) => {

                expect(challenges).toEqual([]);
                done();
            }).catch(done.fail);
        });

        it('should resolve to an empty list if user does not exist', (done) => {

            repo.browseByChallenged('id:foobar').then((challenges) => {

                expect(challenges).toEqual([]);
                done();
            }).catch(done.fail);
        });
    });

    describe('add', () => {

        const challenge = {
            challengingUser: 'id:003',
            challengedUser: 'id:004',
            challengingMaze: 'm5'
        };

        it('should resolve to a new repo', (done) => {

            repo.add(challenge).then((newRepo) => {

                expect(newRepo).not.toBe(repo);
                expect(newRepo.browseByChallenger).toBeDefined();
                expect(newRepo.add).toBeDefined();

                done();
            }).catch(done.fail);
        });

        it('should contain the challenge in the new repo', (done) => {

            repo.add(challenge).then(

                (newRepo) => newRepo
                    .browseByChallenger(challenge.challengingUser)
            ).then((foundChallenges) => {

                expect(foundChallenges.length).toBe(1);
                expect(foundChallenges[0]).toEqual(challenge);

                done();
            }).catch(done.fail);
        });

        it('should not add the challenge to the old repo', (done) => {

            repo.add(challenge).then(

                () => repo.browseByChallenger(challenge.challengingUser)
            ).then((foundChallenges) => {

                expect(foundChallenges.length).toBe(0);

                done();
            }).catch(done.fail);
        });
    });
});
