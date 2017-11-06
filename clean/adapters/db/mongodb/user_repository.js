// Instead of requiring once at the top, we require connect in each repository
// call. This allows us to defer connecting to MongoDB until the first use,
// cleaning up our test output.
// const connect = require('./connect');

const repository = {

    dump() {

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

    browse(email) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            models.User.
                find({ email }, (err, users) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(users);
                    }
                });
        }));
    },

    add(id, email, display) {

        const connect = require('./connect');

        return connect.then((models) => new Promise((resolve, reject) => {

            new models.User({
                _id: id,
                email,
                display
            }).save((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        }));
    }
};

module.exports = repository;
