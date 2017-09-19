const view = require('./view');

const mazeRepository = require('../../../adapters/db/mongodb/maze_repository');
const mazeUsecases = require('../../../usecases/maze');

module.exports = {

    read(req, res) {
        const email = req.user;
        const mazeId = req.params.id;

        mazeUsecases.read(mazeRepository, mazeId).
        then((maze) => {
            res.set('Content-Type', 'application/json');
            res.send(view.render(maze));
        });
    },

    edit(req, res) {

        const email = req.user;
        const mazeId = req.params.id;

        const newMap = req.body.map;

        mazeUsecases.updateMap(mazeRepository, mazeId, newMap).
        then(() => {
            res.sendStatus(200);
        });
    }
};
