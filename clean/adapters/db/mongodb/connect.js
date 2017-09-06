const mongoose = require('mongoose');

// All of the connection management should be handled internally.
// External code only needs to form queries using models.

const connect = new Promise((resolve, reject) => {

    mongoose.connect(
        process.env.MONGODB_URI || 'mongodb://localhost:27017/test'
    );

    const db = mongoose.connection;
    db.on('error', reject);
    db.on('open', resolve);
});

const models = connect.then(() => {

    const Schema = mongoose.Schema;

    const schemas = {

        maze: {
            name: String,
            size: Number,
            creator: {
                type: String,
                ref: 'User'
            }
        },

        revision: {
            maze: {
                type: Schema.Types.ObjectId,
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
        }
    };

    return {
        Maze: mongoose.model('Maze', schemas.maze),
        Revision: mongoose.model('Revision', schemas.revision),
        User: mongoose.model('User', schemas.user)
    };
});

module.exports = models;
