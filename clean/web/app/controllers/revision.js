const mazeRepository = require('../../../adapters/db/mongodb/maze_repository');
const mazeUseCases = require('../../../usecases/maze');

module.exports = {

    read(req, res, next) {

        const user = req.locals.user;
        const revisionId = req.params.revision;

        mazeUseCases.readRevision(revisionId, mazeRepository).
            then((revision) => {

                const view = revision.locked?
                    'revision/view':
                    'revision/edit';

                res.render(view, {
                    user: user.display,
                    revision
                });

                next();
            });
    },

    run(req, res, next) {

        // FIXME - This is why we abstract. So much copied code.

        const user = req.locals.user;
        const revisionId = req.params.revision;

        mazeUseCases.readRevision(revisionId, mazeRepository).
            then((revision) => {

                res.render('revision/run', {
                    user: user.display,
                    revision
                });

                next();
            });
    },

    edit(req, res, next) {

        const revisionId = req.params.revision;
        const body = req.body;

        mazeUseCases.editRevision(mazeRepository, revisionId, body).
            then(() => {
                res.sendStatus(200);
                next();
            });
    }
};
