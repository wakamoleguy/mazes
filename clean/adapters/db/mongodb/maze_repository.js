const connect = require('./connect');

module.exports = {

    browse(userId) {

        return connect.then((models) => new Promise((resolve, reject) => {

            models.Maze.
            find({
                creator: userId
            }).
            find((err, mazes) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(mazes);
                }
            });
        }));
    }
}
