class Revision {

    constructor(size) {

        this.length = size;
    }

    static isEmpty(revision) {
        throw new Error('Unimplemented');
    }

    static sizeOf(revision) {
        throw new Error('Unimplemented');
    }
};

const schemas = {

    maze: {
        name: String,
        size: Number,
        creator: {
            type: String,
            ref: 'User'
        },
        revisions: [{
            //type: Schema.Types.ObjectId,
            ref: 'Revision'
        }]
    },

    revision: {
        maze: {
            //type: Schema.Types.ObjectId,
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

module.exports = Revision;
