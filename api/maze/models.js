const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemas = {

    maze: {
        name: String,
        size: Number,
        creator: {
          type: String,
          ref: 'User'
      },
      revisions: [{
          type: Schema.Types.ObjectId,
          ref: 'Revision'
      }]
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
  }
};

const classes = {
    Maze: mongoose.model('Maze', schemas.maze),
    Revision: mongoose.model('Revision', schemas.revision)
};

module.exports = classes;
