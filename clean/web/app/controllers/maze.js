const mazeRepository = require('../../../adapters/db/mongodb/maze_repository');
const mazeUseCases = require('../../../usecases/maze');

module.exports = {

    list(req, res, next) {

        const user = req.locals.user;
        // const display = user.display;

        mazeUseCases.browseByCreator(user.id, mazeRepository).
            then((mazes) => {

                res.render('pages/maze', {
                    user,
                    mazes
                });

                next();
            }, (err) => {
                console.error(err);
                res.sendStatus(500);
                next();
            });
    },

    read(req, res, next) {

        const mazeId = req.params.maze;

        mazeUseCases.read(mazeId, mazeRepository).then((maze) => {

            if (maze === null) {
                // No maze found by that id.
                res.sendStatus(404);
            } else {

                res.render('pages/maze_view', {
                    maze,
                    user: req.locals.user
                });
            }

            next();
        });
    },

    run(req, res, next) {

        const mazeId = req.params.maze;

        mazeUseCases.read(mazeId, mazeRepository).then((maze) => {

            if (maze === null) {
                // No maze found by that id.
                res.sendStatus(404);
            } else {

                res.render('pages/maze_run', {
                    maze,
                    user: req.locals.user
                });
            }

            next();
        });
    },

    edit(req, res) {

        res.render('maze/edit');
    }
};
