const controller = require('./maze');
const userUseCases = require('../../../usecases/user');
const mazeUseCases = require('../../../usecases/maze');

describe('Maze controller', () => {

    let req, res;
    var foo = '123';

    beforeEach(() => {

        req = jasmine.createSpyObj('req', ['foo']);
        res = jasmine.createSpyObj('res', ['render', 'sendStatus']);


        req.locals = {
            user: {
                display: 'Ned Stark',
                email: 'ned@stark.example.com'
            }
        };

    });

    describe('browse', () => {

        beforeEach(() => {

            spyOn(userUseCases, 'add').and.returnValue(Promise.resolve(false));
            spyOn(mazeUseCases, 'browseMazes').and.returnValue(Promise.resolve([]));
        });

        it('should render the maze list index page', (done) => {

            controller.list(req, res, () => {

                expect(res.render).
                toHaveBeenCalledWith('maze/list', jasmine.any(Object));

                done();
            });
        });

        it('should render the display name for the user', (done) => {

            controller.list(req, res, () => {

                expect(res.render).
                toHaveBeenCalledWith(jasmine.any(String), jasmine.objectContaining({
                    user: 'Ned Stark'
                }));

                done();
            });
        });

        it('should fetch mazes', (done) => {

            mazeUseCases.browseMazes.and.returnValue(Promise.resolve([1,2,3]));

            controller.list(req, res, () => {

                expect(mazeUseCases.browseMazes).
                toHaveBeenCalledWith(
                    jasmine.any(Object),
                    'ned@stark.example.com');

                expect(res.render).
                toHaveBeenCalledWith(jasmine.any(String), jasmine.objectContaining({
                    mazes: [1,2,3]
                }));

                done();
            });
        });

    });

    describe('read', () => {

        beforeEach(() => {

            req.params = {
                maze: '123ABC'
            };

            spyOn(mazeUseCases, 'read').and.returnValue(Promise.resolve('A'));
        });

        it('should render the maze details page', (done) => {

            controller.read(req, res, () => {

                expect(res.render).toHaveBeenCalledWith('maze/view', jasmine.any(Object));

                done();
            });
        });

        it('should render the display name for the user', (done) => {

            controller.read(req, res, () => {

                expect(res.render).toHaveBeenCalledWith(jasmine.any(String), jasmine.objectContaining({
                    user: 'Ned Stark'
                }));
                done();
            });
        });

        it('should fetch the maze from the repository', (done) => {

            controller.read(req, res, () => {

                expect(mazeUseCases.read).toHaveBeenCalledWith(jasmine.any(Object), '123ABC');

                expect(res.render).toHaveBeenCalledWith(jasmine.any(String), jasmine.objectContaining({
                    maze: 'A'
                }));
                done();
            });
        });

    });

    describe('edit', () => {

    });

    describe('add', () => {

    });

    describe('delete', () => {

    });
});
