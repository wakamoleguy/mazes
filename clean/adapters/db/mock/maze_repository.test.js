const repo = require('./maze_repository');

describe('Mock Maze Repository', () => {

    describe('browseByCreator', () => {

        it('should resolve to a list of mazes if user exists', (done) => {

            repo.browseByCreator('001').then((mazes) => {

                expect(mazes).toBeDefined();
                expect(mazes.length).toBe(1);

                done();
            }).catch(done.fail);
        });

        it('should resolve to an empty list if user has no mazes', (done) => {

            repo.browseByCreator('004').then((mazes) => {

                expect(mazes).toEqual([]);
                done();
            }).catch(done.fail);
        });

        it('should resolve to an empty list if the userId is bad', (done) => {

            repo.browseByCreator('InvalidUserId').then((mazes) => {

                expect(mazes).toEqual([]);
                done();
            }).catch(done.fail);
        });
    });
});
