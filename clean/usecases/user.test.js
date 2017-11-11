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
