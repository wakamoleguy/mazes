const INITIAL_DATA = require('./data');

function createRepo(data) {

    return {

        browseByCreator(userId) {

            return new Promise((resolve) => {

                const mazes = Object.values(data.mazes);

                resolve(mazes.filter((maze) => maze.creator === userId));
            });
        }
    };
}

module.exports = createRepo(INITIAL_DATA);
