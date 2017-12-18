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

});
