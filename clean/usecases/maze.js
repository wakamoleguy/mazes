module.exports = {

    browseByCreator(userId, mazeRepo) {

        return mazeRepo.browseByCreator(userId);
    },

    browseMazes(mazeRepository, email) {

        return mazeRepository.revision.browseLatestByCreatorEmail(email).
            then((revisions) => revisions.map((revision) => ({
                id: revision.maze._id,
                name: revision.maze.name,
                size: revision.maze.size,
                creator: revision.maze.creator,
                version: revision.version
            })));
    },

};
