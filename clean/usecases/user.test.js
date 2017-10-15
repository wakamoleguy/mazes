const usecases = require('./user');

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
