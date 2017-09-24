module.exports = {

    browseMazes(mazeRepository, email) {

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
    },

    read(mazeRepository, mazeId) {
        return mazeRepository.revision.readLatestMazeRevision(mazeId).
        then((revision) => {

            return {
                id: revision.maze._id,
                name: revision.maze.name,
                size: revision.maze.size,
                creator: revision.maze.creator,
                version: revision.maze.version,
                start: revision.start,
                destination: revision.destination,
                map: revision.map,
                //FIXME - Separate maze and latest revision use cases
                revisions: [revision]
            };
        });
    },

    updateMap(mazeRepository, mazeId, map) {

        return mazeRepository.revision.readLatestMazeRevision(mazeId).
        then((revision) => {

            return mazeRepository.revision.update(
                revision._id,
                mazeId,
                revision.version,
                revision.start,
                revision.destination,
                map);
        });
    }
};
