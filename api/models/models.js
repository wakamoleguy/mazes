const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemas = {

    widget: {
        name: String,
        value: Number
    },

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
    Widget: mongoose.model('Widget', schemas.widget),
    Maze: mongoose.model('Maze', schemas.maze)
};

module.exports = classes;
