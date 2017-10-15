module.exports = {

    read(mazeRepository, revisionId) {

        return mazeRepository.revision.read(revisionId);
    },

    edit(mazeRepository, revisionId, revision) {

    }
};
