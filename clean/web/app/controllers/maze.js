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

        mazeUseCases.read(mazeRepository, mazeId).then((maze) => {

            res.render('maze/view', {
                maze,
                user: req.locals.user.display
            });

            next();
        });
    },

    run(req, res) {

        const mazeId = req.params.maze;

        mazeUseCases.read(mazeRepository, mazeId).then((maze) => {

            res.render('maze/run', {
                maze
            });
        });
    },

    edit(req, res) {

        res.render('maze/edit');
    }
};
