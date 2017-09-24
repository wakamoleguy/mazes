const userRepository = require('../../../adapters/db/mongodb/user_repository');
const mazeRepository = require('../../../adapters/db/mongodb/maze_repository');
const mazeUseCases = require('../../../usecases/maze');
const userUseCases = require('../../../usecases/user');

module.exports = {

    list(req, res) {

        const email = req.user;
        const display = email;

        // If this user does not exist, create it.
        userUseCases.add(email, display, userRepository, mazeRepository).
        then((isNew) => {

            // TODO - backwards arguments?
            return mazeUseCases.browseMazes(mazeRepository, email);
        }).
        then((mazes) => {

            res.render('maze/list', {
                user: display,
                mazes
            });
        }, (err) => {
            console.error(err);
            res.sendStatus(500);
        });
    },

    read(req, res) {

        const mazeId = req.params.maze;

        mazeUseCases.read(mazeRepository, mazeId).then((maze) => {

            res.render('maze/view', {
                maze
            });
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
