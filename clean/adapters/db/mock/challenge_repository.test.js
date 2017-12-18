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

    describe('read', () => {

        it('should resolve to a challenge if it exists', (done) => {

            repo.read('c0').then((maybeChallenge) => {

                expect(maybeChallenge).not.toBeNull();
                expect(maybeChallenge.id).toBe('c0');

                done();
            });
        });

        it('should resolve to different challenges', (done) => {

            repo.read('c2').then((maybeChallenge) => {

                expect(maybeChallenge).not.toBeNull();
                expect(maybeChallenge.id).toBe('c2');

                done();
            });
        });

        it('should resolve to null if no maze found', (done) => {

            repo.read('foobar').then((maybeChallenge) => {

                expect(maybeChallenge).toBeNull();

                done();
            });
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


    describe('updateAccept', () => {

        it('should resolve to a new repo', (done) => {

            repo.updateAccept('c0', 'm2').then((newRepo) => {

                expect(newRepo).not.toBe(repo);

                // Make sure it looks like a repo
                expect(newRepo.updateAccept).toBeDefined();
                expect(newRepo.browseByChallenger).toBeDefined();

                done();
            }).catch(done.fail);
        });

        it('should contain the updated challenge in the new repo', (done) => {

            repo.updateAccept('c0', 'm2').then(

                (newRepo) => newRepo.read('c0')
            ).then((challenge) => {

                expect(challenge.challengedMaze).toBe('m2');

                done();
            }).catch(done.fail);
        });

        it('should not update the challenge in the old repo', (done) => {

            repo.updateAccept('c0', 'm2').then(

                () => repo.read('c0')
            ).then((challenge) => {

                expect(challenge.challengedMaze).toBeNull();

                done();
            }).catch(done.fail);
        });

        it('should throw if the challenge does not exist', (done) => {

            repo.updateAccept('foobar', 'm2').then(done.fail, done);
        });

        it('should throw if the challenge is already accepted', (done) => {

            repo.updateAccept('c1', 'm2').then(done.fail, done);
        });

        it('should throw if the challenge is already first-run', (done) => {

            repo.updateAccept('c2', 'm2').then(done.fail, done);
        });

        it('should throw if the challenge is already second-run', (done) => {

            repo.updateAccept('c3', 'm2').then(done.fail, done);
        });

        it('should throw if the challenge is already complete', (done) => {

            repo.updateAccept('c4', 'm2').then(done.fail, done);
        });
    });
});
