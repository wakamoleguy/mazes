const challengeRepository =
    require('../../../adapters/db/mongodb/challenge_repository');
const challengeUseCases = require('../../../usecases/challenge');

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
    }
};
