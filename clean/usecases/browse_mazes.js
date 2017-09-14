module.exports = function (mazeRepository, email) {

    return mazeRepository.revision.browseLatestByCreatorEmail(email).
    then((revisions) => {

        return revisions.map((revision) => {
            return {
                id: revision.maze._id,
                name: revision.maze.name,
                size: revision.maze.size,
                creator: revision.maze.creator,
                version: revision.version
            };
        });
    });
};
