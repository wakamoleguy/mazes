const repo = require('./user_repository');

describe('Mock User Repository', () => {

    describe('readByEmail', () => {

        it('should resolve to a user if it exists', (done) => {

            repo.readByEmail('ned@stark.example.com').then((ned) => {

                expect(ned).toEqual({
                    email: 'ned@stark.example.com',
                    id: 'id:001',
                    display: 'Eddard Stark'
                });

                done();
            }).catch(done.fail);
        });

        it('should resolve to a different user with another email', (done) => {

            repo.readByEmail('cat@stark.example.com').then((cat) => {

                expect(cat).toEqual({
                    email: 'cat@stark.example.com',
                    id: 'id:002',
                    display: 'Catelyn Stark'
                });

                done();
            }).catch(done.fail);
        });

        it('should resolve to null if no user exists', (done) => {

            repo.readByEmail('nightking@whitewalkers.example.com').then((u) => {

                expect(u).toBeNull();
                done();
            }).catch(done.fail);
        });
    });

    describe('read', () => {

        it('should resolve to a user if it exists', (done) => {

            repo.read('id:001').then((ned) => {

                expect(ned).toEqual({
                    email: 'ned@stark.example.com',
                    id: 'id:001',
                    display: 'Eddard Stark'
                });

                done();
            }).catch(done.fail);
        });

        it('should resolve to a different user with another id', (done) => {

            repo.read('id:002').then((cat) => {

                expect(cat).toEqual({
                    email: 'cat@stark.example.com',
                    id: 'id:002',
                    display: 'Catelyn Stark'
                });

                done();
            }).catch(done.fail);
        });

        it('should resolve to null if no user exists', (done) => {

            repo.read('id:101').then((u) => {

                expect(u).toBeNull();
                done();
            }).catch(done.fail);
        });
    });


    describe('add', () => {
        const nightking = {
            id: 'id:101',
            display: 'The Night King',
            email: 'nightking@whitewalkers.example.com'
        };

        it('should resolve to a new repo', (done) => {

            repo.add(nightking).then((newRepo) => {

                expect(newRepo).not.toBe(repo);
                expect(newRepo.readByEmail).toBeDefined();
                expect(newRepo.add).toBeDefined();

                done();
            }).catch(done.fail);
        });

        it('should contain the user in the new repo', (done) => {

            repo.add(nightking).then(

                (newRepo) => newRepo.readByEmail(nightking.email)
            ).then((maybeFoundUser) => {

                expect(maybeFoundUser).toEqual(nightking);

                done();
            }).catch(done.fail);
        });

        it('should not add the user to the old repo', (done) => {

            repo.add(nightking).then(

                () => repo.readByEmail(nightking.email)
            ).then((maybeFoundUser) => {

                expect(maybeFoundUser).toBeNull();

                done();
            }).catch(done.fail);
        });

        it('should throw if the id conflicts', (done) => {

            repo.add({
                id: 'id:001',
                email: 'other.ned@stark.example.com',
                display: 'Ned Stark'
            }).then(done.fail, done);
        });

        it('should throw if the email conflicts', (done) => {

            repo.add({
                id: 'id:101',
                email: 'ned@stark.example.com',
                display: 'Ned Stark'
            }).then(done.fail, done);
        });

        it('should succeed if the display name conflicts', (done) => {

            repo.add({
                id: 'id:101',
                email: 'other.ned@stark.example.com',
                display: 'Eddard Stark'
            }).then(done).catch(done.fail);
        });
    });
});
