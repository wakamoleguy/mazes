const passwordless = require('passwordless');
const MongoStore = require('passwordless-mongostore');
const email = require('emailjs');

const User = require('../user/model');
const Maze = require('../maze/models').Maze;

const smtpServer = email.server.connect({
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    host: 'smtp.gmail.com',
    ssl: true
});

passwordless.init(
    new MongoStore(
        process.env.MONGODB_URI ||
        'mongodb://localhost:27017/passwordless-simple-mail'
    ));

passwordless.addDelivery((token, uid, recipient, callback) => {

    const returnUrl = 'http://localhost:3000/api/auth/';

    smtpServer.send({
        text: `Hello! Access your account here: ${returnUrl}?token=${token}&uid=${encodeURIComponent(uid)}`,
        from: 'mailtest@wakamoleguy.com',
        to: recipient,
        subject: 'Token for Mazes Login'
    }, (err, message) => {
        if (err) {
            console.error(err);
        }
        callback(err);
    });
});

exports.accepted = function (req, res) {

    User.User.findById(req.user, (err, foundUser) => {
        if (err) {
            console.error(error);
            res.status(500).send('Error during user lookup');
            return;
        }

        if (foundUser) {
            res.sendStatus(200);
            return;
        }

        const user = new User.User({
            display: req.user,
            email: req.user,
            _id: req.user
        }).save((err, savedUser) => {

            const mazes = [0, 1, 2].map((n) => {

                const maze = new Maze({
                    name: `Maze ${n}`,
                    size: 11,
                    start: { z: 9, x: 9, direction: 'west' },
                    destination: { z: 11, x: 1 },
                    map: [
                        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                    ],
                    creator: req.user
                });

                maze.save();

                return maze;
            });

            res.sendStatus(200);
        });
    });
};
