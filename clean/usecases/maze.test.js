const usecases = require('./maze');
const mazeRepo = require('../adapters/db/mock/maze_repository');

describe('Maze use cases', () => {

    describe('browseByCreator', () => {

        it('should resolve to a list of mazes for the user', (done) => {

            usecases.browseByCreator('id:003', mazeRepo).then((mazes) => {

                expect(mazes.length).toBe(3);
                done();
            }).catch(done.fail);
        });

        it('should include revisions for those mazes', (done) => {

            usecases.browseByCreator('id:003', mazeRepo).then((mazes) => {

                expect(mazes[0].revisions).toBeDefined();
                expect(mazes[0].revisions.length).toBe(1);
                done();
            });
        });

        it('should reject if the mazes do not have revisions', (done) => {

            const mockRepo = {

                browseByCreator() {

                    return new Promise((resolve) => {

                        resolve({
                            id: 'm1',
                            creator: 'id:001',
                            size: 9
                        });
                    });
                }
            };

            usecases.browseByCreator('id:003', mockRepo).then(done.fail, done);
        });

        it('should resolve to an empty list if no mazes found', (done) => {

            usecases.browseByCreator('id:004', mazeRepo).then((mazes) => {

                expect(mazes).toEqual([]);
                done();
            }).catch(done.fail);
        });
    });

    describe('read', () => {

        it('should resolve to a single maze if found', (done) => {

            usecases.read('m1', mazeRepo).then((maze) => {

                expect(maze).toBeDefined();
                expect(maze.id).toBe('m1');
                expect(maze.revisions).toBeDefined();

                done();
            });
        });

        it('should resolve to null if no maze is found', (done) => {

            usecases.read('foobar', mazeRepo).then((maze) => {

                expect(maze).toBeNull();
                done();
            });
        });
    });

    describe('updateMap', () => {

        const newMap = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        it('should resolve true if the maze is found and updated', (done) => {

            usecases.updateMap('m1', newMap, mazeRepo).then((result) => {

                expect(result).toBe(true);
                done();
            });
        });

        it('should resolve false if the maze does not exist', (done) => {

            usecases.updateMap('foobar', newMap, mazeRepo).then((result) => {

                expect(result).toBe(false);
                done();
            });
        });

        it('should resolve false if the map is the wrong size', (done) => {

            const smallerMap = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            usecases.updateMap('m1', smallerMap, mazeRepo).then((result) => {

                expect(result).toBe(false);
                done();
            });
        });
    });

    describe('create', () => {

        const name = 'The Wall';
        const size = 9;
        const creatorId = 'id:001';

        it('should create a new maze', (done) => {

            usecases.create(name, size, creatorId, mazeRepo).then((result) => {

                expect(result.maze).toEqual({
                    id: jasmine.any(String),
                    creator: creatorId,
                    size,
                    name,
                    revisions: [{

                        id: jasmine.any(String),
                        maze: jasmine.any(String),
                        version: 0,
                        start: { x: 0, z: 0, direction: 'east' },
                        destination: { x: -1, z: 0 },
                        map: [
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ]
                    }]
                });

                expect(result.maze.revisions[0].maze).toEqual(result.maze.id);

                done();
            }).catch(done.fail);
        });

        it('should resolve with a new repo', (done) => {

            usecases.create(name, size, creatorId, mazeRepo).then((result) => {

                expect(result.mazeRepo).toBeDefined();
                expect(result.mazeRepo).not.toBe(mazeRepo);

                done();
            }).catch(done.fail);
        });

        it('should resolve to the exact same thing that is read', (done) => {

            usecases.create(name, size, creatorId, mazeRepo).then((result) => {

                const mazeId = result.maze.id;

                const readMaze = usecases.read(mazeId, result.mazeRepo);

                return Promise.all([result.maze, readMaze]);
            }).then((mazes) => {

                expect(mazes[0]).toEqual(mazes[1]);

                done();
            }).catch(done.fail);
        });
    });
});
