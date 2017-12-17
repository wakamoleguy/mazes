// Instead of requiring once at the top, we require connect in each repository
// call. This allows us to defer connecting to MongoDB until the first use,
// cleaning up our test output.
// const connect = require('./connect');

const repository = {

    browse() {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            models.User.find({}, (err, users) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            });
        }));
    },

    readByEmail(email) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            models.User.
                findOne({ email }, (err, user) => {

                    if (err) {
                        reject(err);
                    } else if (user !== null) {
                        resolve({
                            id: user._id,
                            email: user.email,
                            display: user.display
                        });
                    } else {
                        resolve(null);
                    }
                });
        }));
    },

    read(id) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            models.User.
                findById(id, (err, user) => {

                    if (err) {
                        reject(err);
                    } else if (user !== null) {
                        resolve({
                            id: user._id,
                            email: user.email,
                            display: user.display
                        });
                    } else {
                        resolve(null);
                    }
                });
        }));
    },

    add(newUser) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            new models.User({
                _id: newUser.id,
                email: newUser.email,
                display: newUser.display
            }).save((err) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(repository);
                }
            });
        }));
    }
};

module.exports = repository;
