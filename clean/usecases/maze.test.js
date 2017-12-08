const usecases = require('./maze');
const mazeRepo = require('../adapters/db/mock/maze_repository');

describe('Maze use cases', () => {

    describe('browseByCreator', () => {

        it('resolves to a list of mazes for the user', (done) => {

            usecases.browseByCreator('id:003', mazeRepo).then((mazes) => {

                expect(mazes.length).toBe(3);
                done();
            }).catch(done.fail);
        });

        it('includes revisions for those mazes', (done) => {

            usecases.browseByCreator('id:003', mazeRepo).then((mazes) => {

                expect(mazes[0].revisions).toBeDefined();
                expect(mazes[0].revisions.length).toBe(1);
                done();
            });
        });

        it('rejects if the mazes do not have revisions (bad data)', (done) => {

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

        it('resolves to an empty list if no mazes found', (done) => {

            usecases.browseByCreator('id:004', mazeRepo).then((mazes) => {

                expect(mazes).toEqual([]);
                done();
            }).catch(done.fail);
        });
    });
});
