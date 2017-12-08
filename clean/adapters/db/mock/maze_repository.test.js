const repo = require('./maze_repository');

describe('Mock Maze Repository', () => {

    describe('browseByCreator', () => {

        it('should resolve to a list of mazes if user exists', (done) => {

            repo.browseByCreator('id:001').then((mazes) => {

                expect(mazes).toBeDefined();
                expect(mazes.length).toBe(1);

                done();
            }).catch(done.fail);
        });

        it('should include revisions with the mazes resolved', (done) => {

            repo.browseByCreator('id:001').then((mazes) => {

                const maze = mazes[0];

                expect(maze.revisions).toBeDefined();
                expect(maze.revisions.length).toBe(3);
                expect(maze.revisions[2]).toEqual({
                    id: 'm1r2',
                    maze: 'm1',
                    version: 2,
                    start: {
                        x: 0,
                        z: 0,
                        direction: 'east'
                    },
                    destination: {
                        x: 8,
                        z: 8
                    },
                    map: [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 1, 1, 0, 0, 0, 1, 1, 0],
                        [0, 1, 1, 0, 0, 0, 1, 1, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 1, 1, 0, 0, 0, 1, 1, 0],
                        [0, 1, 1, 0, 0, 0, 1, 1, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0]
                    ]
                });

                done();
            });
        });

        it('should resolve to an empty list if user has no mazes', (done) => {

            repo.browseByCreator('id:004').then((mazes) => {

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

    describe('read', () => {

        it('should resolve to a maze if it exists', (done) => {

            repo.read('m1').then((maybeMaze) => {

                expect(maybeMaze).not.toBeNull();
                expect(maybeMaze.id).toBe('m1');
                expect(maybeMaze.revisions.length).toBe(3);

                done();
            });
        });

        it('should resolve to different mazes with different ids', (done) => {

            repo.read('m6').then((maybeMaze) => {

                expect(maybeMaze).not.toBeNull();
                expect(maybeMaze.id).toBe('m6');
                expect(maybeMaze.revisions.length).toBe(1);

                done();
            });
        });

        it('should resolve to null if no maze found', (done) => {

            repo.read('foobar').then((maybeMaze) => {

                expect(maybeMaze).toBeNull();

                done();
            });
        });
    });
});
