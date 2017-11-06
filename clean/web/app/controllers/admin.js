const userRepository = require('../../../adapters/db/mongodb/user_repository');
const mazeRepository = require('../../../adapters/db/mongodb/maze_repository');

const AdminController = {

    dashboard(req, res) {
        const user = req.locals.user;

        // Authorize
        if (user.email !== 'wakamoleguy@gmail.com') {
            res.sendStatus(403);
            return;
        }

        return Promise.all([
            userRepository.dump(),
            mazeRepository.dump()
        ]).then((results) => ({
            users: results[0],
            mazes: results[1]
        })).then((data) => {

            console.log('Data', data.users, data.mazes);

            res.render('admin/dashboard', data);
        }).catch((err) => {
            res.sendStatus(500);
            throw err;
        });
    }
};

module.exports = AdminController;
