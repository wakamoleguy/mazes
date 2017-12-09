module.exports = {

    browseByCreator(userId, mazeRepo) {

        return mazeRepo.browseByCreator(userId).then((mazes) => {

            if (mazes.some((maze) => !maze.revisions)) {
                throw new Error('Bad Data: Expected mazes to have revisions');
            }

            return mazes;
        });
    },

    read(mazeId, mazeRepo) {

        return mazeRepo.read(mazeId);
    },

    updateMap(mazeId, newMap, mazeRepo) {

        return mazeRepo.updateMap(mazeId, newMap).
            then(() => true).catch(() => false);
    }
};
