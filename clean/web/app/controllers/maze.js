const userRepository = require('../../../adapters/db/mongodb/user_repository');
const mazeRepository = require('../../../adapters/db/mongodb/maze_repository');
const mazeUseCases = require('../../../usecases/maze');
const userUseCases = require('../../../usecases/user');

module.exports = {

    list(req, res, next) {

        const user = req.locals.user;
        const display = user.display;
        const email = user.email;

        // If this user does not exist, create it.
        userUseCases.add(email, display, userRepository, mazeRepository).
            then(() => {

                // TODO - backwards arguments?
                return mazeUseCases.browseMazes(mazeRepository, email);
            }).
            then((mazes) => {

                res.render('maze/list', {
                    user: display,
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
