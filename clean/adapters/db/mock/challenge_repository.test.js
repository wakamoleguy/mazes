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
});
