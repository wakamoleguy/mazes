const challengeRepository =
    require('../../../adapters/db/mongodb/challenge_repository');
const mazeRepo = require('../../../adapters/db/mongodb/maze_repository');
const userRepo = require('../../../adapters/db/mongodb/user_repository');

const challengeUseCases = require('../../../usecases/challenge');
const mazeUseCases = require('../../../usecases/maze');
const userUseCases = require('../../../usecases/user');

module.exports = {

    browse(req, res, next) {

        const user = req.locals.user;

        challengeUseCases.browseByParticipant(user.id, challengeRepository).
            then((challenges) => {

                res.render('pages/challenge', {
                    user,
                    challenges
                });

                next();
            }, (err) => {
                console.error(err);
                res.sendStatus(500);
                next();
            });
    },

    create(req, res, next) {

        const user = req.locals.user;

        const usersP = userUseCases.browse(userRepo);
        const mazesP = mazeUseCases.browseByCreator(user.id, mazeRepo);

        Promise.all([usersP, mazesP]).then((result) => {

            const users = result[0];
            const mazes = result[1];

            res.render('pages/challenge_create', {
                user,
                users,
                mazes
            });

            next();
        }, (err) => {
            console.error(err);
            res.sendStatus(500);
            next();
        });
    },

    add(req, res, next) {

        const user = req.locals.user;

        const challengedUserId = req.body.opponent;
        const mazeId = req.body.maze;

        if (!challengedUserId || !mazeId) {
            res.sendStatus(400);
            next();
            return;
        }

        challengeUseCases.create(
            user.id,
            challengedUserId,
            mazeId,
            challengeRepository
        ).then(() => {

            challengeUseCases.browseByParticipant(
                user.id,
                challengeRepository
            ).then((challenges) => {

                res.render('pages/challenge', {
                    user,
                    challenges
                });

                next();
            }, (err) => {
                console.error(err);
                res.sendStatus(500);
                next();
            });
        });
    }
};
