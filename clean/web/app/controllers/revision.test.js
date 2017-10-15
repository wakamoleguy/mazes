const controller = require('./revision');
const mazeUseCases = require('../../../usecases/maze');

describe('Revision controller', () => {

    let req, res;

    beforeEach(() => {

        req = {};
        res = jasmine.createSpyObj('res', ['render', 'sendStatus']);

        req.locals = {
            user: {
                display: 'Ned Stark',
                email: 'ned@stark.example.com'
            }
        };
    });

    describe('browse', () => {
    });

    describe('read', () => {

        beforeEach(() => {

            req.params = {
                revision: '123ABC'
            };

            // TODO - Separate use case, probably
            spyOn(mazeUseCases, 'readRevision').and.
                returnValue(Promise.resolve({
                    data: 'foobar',
                    locked: true
                }));
        });

        it('should render the display name for the user', (done) => {

            controller.read(req, res, () => {

                expect(res.render).
                    toHaveBeenCalledWith(
                        jasmine.any(String),
                        jasmine.objectContaining({
                            user: 'Ned Stark'
                        }));
                done();
            });
        });

        it('should fetch the revision details', (done) => {

            controller.read(req, res, () => {

                expect(res.render).
                    toHaveBeenCalledWith(
                        jasmine.any(String),
                        jasmine.objectContaining({
                            revision: {
                                data: 'foobar',
                                locked: true
                            }
                        }));

                done();
            });
        });

        it('should render the revision read page if locked', (done) => {

            controller.read(req, res, () => {

                expect(res.render).
                    toHaveBeenCalledWith('revision/view', jasmine.any(Object));
                done();
            });
        });

        it('should render the revision edit page if unlocked', (done) => {

            mazeUseCases.readRevision.and.returnValue(Promise.resolve({
                locked: false
            }));

            controller.read(req, res, () => {

                expect(res.render).
                    toHaveBeenCalledWith('revision/edit', jasmine.any(Object));
                done();
            });
        });
    });

    describe('edit', () => {

        beforeEach(() => {

            req.params = {
                revision: '123ABC'
            };

            // TODO - Separate use case, probably
            spyOn(mazeUseCases, 'editRevision').and.
                returnValue(Promise.resolve());
        });

        it('should save the revised maze revision', (done) => {
            const body = {
                start: { x: 2, z: 3, direction: 'north' },
                destination: { x: -1, z: 0 },
                map: [1,2,3]
            };

            req.body = body;

            controller.edit(req, res, () => {

                expect(mazeUseCases.editRevision).
                    toHaveBeenCalledWith(jasmine.any(Object), '123ABC', {
                        start: { x: 2, z: 3, direction: 'north' },
                        destination: { x: -1, z: 0 },
                        map: [1,2,3]
                    });

                done();
            });
        });

        it('should return success', (done) => {
            const body = {
                start: { x: 2, z: 3, direction: 'north' },
                destination: { x: -1, z: 0 },
                map: [1,2,3]
            };

            req.body = body;

            controller.edit(req, res, () => {

                expect(res.sendStatus).toHaveBeenCalledWith(200);
                done();
            });
        });
    });

    describe('add', () => {
    });

    describe('delete', () => {

    });

    describe('run', () => {

        beforeEach(() => {

            req.params = {
                revision: '123ABC'
            };

            // TODO - Separate use case, probably
            spyOn(mazeUseCases, 'readRevision').and.
                returnValue(Promise.resolve({
                    data: 'foobar',
                    locked: true
                }));
        });

        it('should render the display name for the user', (done) => {

            controller.run(req, res, () => {

                expect(res.render).toHaveBeenCalledWith(
                    jasmine.any(String),
                    jasmine.objectContaining({
                        user: 'Ned Stark'
                    }));
                done();
            });
        });

        it('should fetch the revision details', (done) => {

            controller.run(req, res, () => {

                expect(res.render).toHaveBeenCalledWith(
                    jasmine.any(String),
                    jasmine.objectContaining({
                        revision: {
                            data: 'foobar',
                            locked: true
                        }
                    }));

                done();
            });
        });

        it('should render the revision runner page if locked', (done) => {

            controller.run(req, res, () => {

                expect(res.render).
                    toHaveBeenCalledWith('revision/run', jasmine.any(Object));
                done();
            });
        });

        it('should render the revision runner page if unlocked', (done) => {

            mazeUseCases.readRevision.and.returnValue(Promise.resolve({
                locked: false
            }));

            controller.run(req, res, () => {

                expect(res.render).
                    toHaveBeenCalledWith('revision/run', jasmine.any(Object));
                done();
            });
        });
    });
});
