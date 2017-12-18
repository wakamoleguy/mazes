const usecases = require('./challenge');
const challengeRepo = require('../adapters/db/mock/challenge_repository');

describe('Challenge use cases', () => {

    describe('browseByParticipant', () => {

        it('should resolve to two lists of challenges for the user', (done) => {

            usecases.browseByParticipant('id:001', challengeRepo).
                then((challenges) => {

                    expect(challenges.sent.length).toBe(5);
                    expect(challenges.received.length).toBe(0);

                    done();
                }).catch(done.fail);
        });

        it('should resolve to empty lists if no matching user', (done) => {

            usecases.browseByParticipant('id:foobar', challengeRepo).
                then((challenges) => {


                    expect(challenges.sent.length).toBe(0);
                    expect(challenges.received.length).toBe(0);

                    done();
                }).catch(done.fail);
        });
    });

    describe('accept', () => {

        it('should save the accepted challenge', (done) => {

            const challengeId = 'c0';
            const mazeId = 'm2';

            spyOn(challengeRepo, 'updateAccept').and.callThrough();

            usecases.accept(challengeId, mazeId, challengeRepo).then(() => {

                expect(challengeRepo.updateAccept).toHaveBeenCalledWith(
                    challengeId,
                    mazeId
                );
                done();
            }).catch(done.fail);
        });
    });

    describe('readRunMaze', () => {

        it('should have tests', (done) => {
            done.fail();
        });
    });

    describe('postTime', () => {

        beforeEach(() => {

            spyOn(challengeRepo, 'updateChallengingTime');
            spyOn(challengeRepo, 'updateChallengedTime');
        });

        it('should save the challenge if the challenger posts', (done) => {

            usecases.postTime('id:001', 'c1', 10, challengeRepo).then(() => {

                expect(challengeRepo.updateChallengingTime).
                    toHaveBeenCalled();
                expect(challengeRepo.updateChallengedTime).
                    not.toHaveBeenCalled();

                done();
            }).catch(done.fail);

        });

        it('should save the challenge if the challenged posts', (done) => {

            usecases.postTime('id:003', 'c1', 10, challengeRepo).then(() => {

                expect(challengeRepo.updateChallengingTime).
                    not.toHaveBeenCalled();
                expect(challengeRepo.updateChallengedTime).
                    toHaveBeenCalled();

                done();
            }).catch(done.fail);

        });

        it('should save if the other user posts after first-run', (done) => {

            usecases.postTime('id:002', 'c2', 94, challengeRepo).then(() => {

                expect(challengeRepo.updateChallengingTime).
                    not.toHaveBeenCalled();
                expect(challengeRepo.updateChallengedTime).
                    toHaveBeenCalled();

                done();
            }).catch(done.fail);

        });

        it('should save if the other user posts after second-run', (done) => {

            usecases.postTime('id:001', 'c3', 63, challengeRepo).then(() => {

                expect(challengeRepo.updateChallengingTime).
                    toHaveBeenCalled();
                expect(challengeRepo.updateChallengedTime).
                    not.toHaveBeenCalled();

                done();
            }).catch(done.fail);

        });

        it('should reject if the user does not match the challenge', (done) => {

            usecases.postTime('id:005', 'c1', 63, challengeRepo).then(
                done.fail,
                done);
        });

        it('should reject if no challenge is found', (done) => {

            usecases.postTime('id:001', 'foobar', 63, challengeRepo).then(
                done.fail,
                done);
        });
    });

});
