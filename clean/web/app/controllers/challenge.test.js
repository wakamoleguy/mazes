const controller = require('./challenge');
const challengeUseCases = require('../../../usecases/challenge');
const mazeUseCases = require('../../../usecases/maze');
const userUseCases = require('../../../usecases/user');

describe('Challenge controller', () => {

    let req, res;

    const ned = {
        display: 'Ned Stark',
        email: 'ned@stark.example.com',
        id: 'id:001'
    };

    beforeEach(() => {

        req = {};
        res = jasmine.createSpyObj('res', [
            'render',
            'sendStatus',
            'redirect'
        ]);

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


    describe('create', () => {

        beforeEach(() => {

            spyOn(userUseCases, 'browse').and.
                returnValue(Promise.resolve([ned, ned, ned]));
            spyOn(mazeUseCases, 'browseByCreator').and.
                returnValue(Promise.resolve(['A', 'B', 'C']));
        });

        it('should render a new challenge creation form', (done) => {

            controller.create(req, res, () => {

                expect(res.render).toHaveBeenCalledWith(
                    'pages/challenge_create',
                    jasmine.any(Object)
                );

                done();
            });
        });

        it('should load a list of users to select from', (done) => {

            controller.create(req, res, () => {

                expect(userUseCases.browse).
                    toHaveBeenCalledWith(jasmine.any(Object));

                expect(res.render).
                    toHaveBeenCalledWith(
                        jasmine.any(String),
                        jasmine.objectContaining({
                            users: [ned, ned, ned]
                        }));
                done();
            });
        });

        it('should load a list of mazes to select from', (done) => {

            controller.create(req, res, () => {

                expect(mazeUseCases.browseByCreator).
                    toHaveBeenCalledWith(ned.id, jasmine.any(Object));

                expect(res.render).
                    toHaveBeenCalledWith(
                        jasmine.any(String),
                        jasmine.objectContaining({
                            mazes: ['A', 'B', 'C']
                        }));
                done();
            });
        });
    });

    // FIXME - This should have a more 'RESTful' name. Actions are SOAPy
    describe('acceptForm', () => {

        beforeEach(() => {

            req.params = {
                challengeId: 'c0'
            };

            spyOn(mazeUseCases, 'browseByCreator').and.
                returnValue(Promise.resolve(['A', 'B', 'C']));
        });

        it('should load a list of mazes to select from', (done) => {

            controller.acceptForm(req, res, () => {

                expect(mazeUseCases.browseByCreator).
                    toHaveBeenCalledWith(ned.id, jasmine.any(Object));

                expect(res.render).
                    toHaveBeenCalledWith(
                        jasmine.any(String),
                        jasmine.objectContaining({
                            mazes: ['A', 'B', 'C']
                        }));
                done();
            });
        });

        it('should render a new challenge accept form', (done) => {

            controller.acceptForm(req, res, () => {

                expect(res.render).toHaveBeenCalledWith(
                    'pages/challenge_accept',
                    jasmine.any(Object)
                );

                done();
            });
        });
    });

    describe('accept', () => {

        beforeEach(() => {
            req.params = {
                challengeId: 'c0'
            };

            req.body = {
                maze: 'm1'
            };

            spyOn(challengeUseCases, 'accept').
                and.returnValue(Promise.resolve());
        });

        it('should update the challenge', (done) => {

            controller.accept(req, res, () => {

                expect(challengeUseCases.accept).toHaveBeenCalledWith(
                    'c0',
                    'm1',
                    jasmine.any(Object)
                );
                done();
            });
        });

        it('should redirect to the challenge list page', (done) => {

            controller.accept(req, res, () => {

                expect(res.redirect).toHaveBeenCalledWith(303, '../');
                done();
            });
        });
    });

});
