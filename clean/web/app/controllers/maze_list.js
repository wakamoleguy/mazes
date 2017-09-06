const userRepository = require('../../../adapters/db/mongodb/user_repository');
const mazeRepository = require('../../../adapters/db/mongodb/maze_repository');
const browseMazes = require('../../../usecases/browse_mazes');
const userUseCases = require('../../../usecases/user');

module.exports = (req, res) => {

    const email = req.user;
    const display = email;

    // If this user does not exist, create it.
    userUseCases.add(email, display, userRepository, mazeRepository).
    then((isNew) => {

        // TODO - backwards arguments?
        return browseMazes(mazeRepository, email);
    }).
    then((mazes) => {

        res.render('maze/index', {
            user: display,
            mazes
        });
    }, (err) => {
        console.error(err);
        res.sendStatus(500);
    });
};
