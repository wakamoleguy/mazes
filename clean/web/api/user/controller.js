const view = require('./view');

const userRepository = require('../../../adapters/db/mongodb/user_repository');
const userUsecases = require('../../../usecases/user');

module.exports = {

    browse(req, res) {

        userUsecases.browse(userId, userRepository).
        then((users) => {
            res.send(view.renderAll(users));
        });
    },

    read(req, res) {
        throw new Error('Unimplemented');
    },

    edit(req, res) {

    },

    add(req, res) {

    },

    delete(req, res) {

    }
};
