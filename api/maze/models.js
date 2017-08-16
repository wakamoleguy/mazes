const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemas = {

    maze: {
        name: String,
        size: Number,
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
    }
};

const classes = {
    Maze: mongoose.model('Maze', schemas.maze)
};

module.exports = classes;
