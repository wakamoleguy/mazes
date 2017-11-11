const usecases = require('./maze');
const mazeRepo = require('../adapters/db/mock/maze_repository');

describe('Maze use cases', () => {

    describe('browseByCreator', () => {

        it('resolves to a list of mazes for the user', (done) => {

            usecases.browseByCreator('003', mazeRepo).then((mazes) => {

                expect(mazes.length).toBe(3);
                done();
            }).catch(done.fail);
        });

        it('resolves to an empty list if no mazes found', (done) => {

            usecases.browseByCreator('004', mazeRepo).then((mazes) => {

                expect(mazes).toEqual([]);
                done();
            }).catch(done.fail);
        });
    });
});
