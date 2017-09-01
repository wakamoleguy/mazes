const mazeRepository = require('../../../adapters/db/mongodb/maze_repository');
const browseMazes = require('../../../usecases/browse_mazes');

module.exports = (req, res) => {

    const user = req.user;

    browseMazes(mazeRepository, user).then((mazes) => {

        res.render('maze/index', {
            user,
            mazes
        });

    }, (err) => {
        console.error(err);
        res.sendStatus(500);
    });
};
