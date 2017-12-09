const INITIAL_DATA = require('./data');

function createRepo(data) {

    return {

        browseByCreator(userId) {

            return new Promise((resolve) => {

                const mazes = Object.values(data.mazes);

                resolve(mazes.filter((maze) => maze.creator === userId));
            });
        },

        read(mazeId) {

            return new Promise((resolve) => {

                const mazes = Object.values(data.mazes);

                resolve(mazes.find((maze) => maze.id === mazeId) || null);
            });
        },

        updateMap(mazeId, newMap) {

            return new Promise((resolve, reject) => {

                const mazes = Object.values(data.mazes);

                const mazeToUpdate = mazes.find((maze) => maze.id === mazeId);

                if (!mazeToUpdate) {

                    reject('No maze found to update');
                } else if (
                    newMap.length !== mazeToUpdate.size ||
                    newMap.some((row) => row.length !== mazeToUpdate.size)
                ) {

                    reject('New map is not the correct size');
                } else {

                    const newMaze = { ...mazeToUpdate };

                    newMaze.revisions = mazeToUpdate.revisions.slice();

                    newMaze.revisions[newMaze.revisions.length - 1] = newMap;

                    const newMazes = { ...data.mazes };
                    newMazes[mazeId] = newMaze;

                    const newData = {
                        users: data.users,
                        mazes: newMazes
                    };

                    resolve(createRepo(newData));
                }
            });
        }
    };
}

module.exports = createRepo(INITIAL_DATA);
