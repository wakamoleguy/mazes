const connect = require('./connect');

module.exports = {

    browse(userId) {

        return connect.then((models) => new Promise((resolve, reject) => {

            models.User.
            find({
                _id: userId
            }).
            find((err, users) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            });
        }));
    }
}
