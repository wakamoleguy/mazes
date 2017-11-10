const usecases = require('./user');
const userRepo = require('../adapters/db/mock/user_repository');

describe('PopulateUser', () => {

    describe('when user exists', () => {

        const email = 'ned@stark.example.com';

        it('should fetch the user from the repo', (done) => {

            usecases.populateUser(email, userRepo).then((result) => {

                expect(result.user).toEqual({
                    email: 'ned@stark.example.com',
                    id: '001',
                    display: 'Eddard Stark'
                });

                done();
            }).catch(done.fail);
        });

        it('should resolve with the same repo', (done) => {

            usecases.populateUser(email, userRepo).then((result) => {

                expect(result.userRepo).toBe(userRepo);

                done();
            }).catch(done.fail);
        });
    });

    describe('when the user is new', () => {
        const email = 'nightking@whitewalkers.example.com';

        it('should create a new user', (done) => {

            usecases.populateUser(email, userRepo).then((result) => {

                expect(result.user).toEqual({
                    email: 'nightking@whitewalkers.example.com',
                    id: jasmine.any(String),
                    display: 'nightking@whitewalkers.example.com'
                });

                done();
            }).catch(done.fail);
        });

        it('should resolve with a new repo', (done) => {

            usecases.populateUser(email, userRepo).then((result) => {

                expect(result.userRepo).toBeDefined();
                expect(result.userRepo).not.toBe(userRepo);

                done();
            }).catch(done.fail);
        });
    });
});

describe('Adding a new user', () => {

    const email = 'dany@targaryen.example.com';
    const display = 'Mother of Dragons';

    let userRepository, mazeRepository;

    beforeEach(() => {

        userRepository = jasmine.createSpyObj('userRepository', [
            'browse',
            'add'
        ]);
        userRepository.browse.and.returnValue(
            new Promise((resolve) => resolve([]))
        );

        mazeRepository = jasmine.createSpyObj('mazeRepository', [ 'add' ]);
    });

    it('should return false if the user already exists', (done) => {
        userRepository.browse.and.returnValue(
            new Promise((resolve) => resolve([{
                id: `id:${email}`,
                email,
                display
            }]))
        );

        usecases.
            add(email, display, userRepository, mazeRepository).
            then((success) => {
                expect(success).toBe(false);
                done();
            }).catch(done.fail);
    });

    it('should create a new user', (done) => {

        usecases.
            add(email, display, userRepository, mazeRepository).
            then((success) => {

                expect(userRepository.browse).toHaveBeenCalledWith(email);

                expect(userRepository.add).toHaveBeenCalledWith(
                    jasmine.any(String),
                    email,
                    display
                );

                expect(success).toBe(true);

                done();
            }).catch(done.fail);
    });

    it('should create three new mazes', (done) => {

        const size = 9;

        usecases.
            add(email, display, userRepository, mazeRepository).
            then(() => {

                expect(mazeRepository.add).toHaveBeenCalledWith(
                    jasmine.any(String),
                    size,
                    jasmine.any(String),
                    'Maze 0',
                    jasmine.any(Object)
                );

                expect(mazeRepository.add).toHaveBeenCalledWith(
                    jasmine.any(String),
                    size,
                    jasmine.any(String),
                    'Maze 1',
                    jasmine.any(Object)
                );

                expect(mazeRepository.add).toHaveBeenCalledWith(
                    jasmine.any(String),
                    size,
                    jasmine.any(String),
                    'Maze 2',
                    jasmine.any(Object)
                );

                expect(mazeRepository.add.calls.count()).toBe(3);

                done();
            }).catch(done.fail);
    });
});
