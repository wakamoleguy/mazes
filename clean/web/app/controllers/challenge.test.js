const controller = require('./challenge');
const challengeUseCases = require('../../../usecases/challenge');

describe('Challenge controller', () => {

    let req, res;

    const ned = {
        display: 'Ned Stark',
        email: 'ned@stark.example.com',
        id: 'id:001'
    };

    beforeEach(() => {

        req = {};
        res = jasmine.createSpyObj('res', ['render', 'sendStatus']);

        req.locals = {
            user: ned
        };
    });

    describe('browse', () => {

        beforeEach(() => {

            spyOn(challengeUseCases, 'browseByParticipant').and.
                returnValue(Promise.resolve({
                    sent: [1, 2, 3],
                    received: [4, 5, 6]
                }));
        });

        it('should render the challenge list page', (done) => {

            controller.browse(req, res, () => {

                expect(res.render).toHaveBeenCalledWith(
                    'pages/challenge',
                    jasmine.any(Object)
                );

                done();
            });
        });

        it('should render the user', (done) => {

            controller.browse(req, res, () => {

                expect(res.render).
                    toHaveBeenCalledWith(
                        jasmine.any(String),
                        jasmine.objectContaining({
                            user: ned
                        }));

                done();
            });
        });

        it('should fetch challenges', (done) => {

            controller.browse(req, res, () => {

                expect(challengeUseCases.browseByParticipant).
                    toHaveBeenCalledWith(ned.id, jasmine.any(Object));

                expect(res.render).
                    toHaveBeenCalledWith(
                        jasmine.any(String),
                        jasmine.objectContaining({
                            challenges: {
                                sent: [1,2,3],
                                received: [4, 5, 6]
                            }
                        }));

                done();
            });
        });
    });
});
