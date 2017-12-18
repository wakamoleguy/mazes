const mongoose = require('mongoose');

// All of the connection management should be handled internally.
// External code only needs to form queries using models.

mongoose.Promise = global.Promise;

const connect = new Promise((resolve, reject) => {

    mongoose.connect(
        global.process.env.MONGODB_URI || 'mongodb://localhost:27017/test'
    );

    const db = mongoose.connection;
    db.on('error', reject);
    db.on('open', resolve);
});

const models = connect.then(() => {

    const schemas = {

        maze: {
            _id: String,
            name: String,
            size: Number,
            creator: {
                type: String,
                ref: 'User'
            },
            revisions: [{
                type: String,
                ref: 'Revision'
            }]
        },

        revision: {
            _id: String,
            maze: {
                type: String,
                ref: 'Maze'
            },
            version: Number,
            start: {
                x: Number,
                z: Number,
                direction: String
            },
            destination: {
                x: Number,
                z: Number
            },
            map: [[Number]]
        },

        user: {
            _id: String,
            email: String,
            display: String
        },

        challenge: {
            challengingUser: {
                type: String,
                ref: 'User'
            },
            challengedUser: {
                type: String,
                ref: 'User'
            },
            challengingMaze: {
                type: String,
                ref: 'Maze'
            },
            challengedMaze: {
                type: String,
                ref: 'Maze'
            },
            challengingTime: Number,
            challengedTime: Number
        }
    };

    return {
        Maze: mongoose.model('Maze', schemas.maze),
        Revision: mongoose.model('Revision', schemas.revision),
        User: mongoose.model('User', schemas.user),
        Challenge: mongoose.model('Challenge', schemas.challenge)
    };
});

module.exports = models;
