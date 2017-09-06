const uuidv4 = require('uuid/v4');
const Revision = require('./revision');

class Maze {

    constructor(size, creator, name) {

        if (size === null || size === undefined || !Number.isInteger(size)) {
            throw new Error('Maze must have Size');
        }

        if (size < Maze.MIN_SIZE || size >= Maze.MAX_SIZE) {
            throw new Error('Maze Size out of bounds');
        }

        if (creator === null || creator === undefined || creator.id === undefined) {
            throw new Error('Maze must have Creator');
        }

        if (name === null || name === undefined || name === '') {
            throw new Error('Maze must have Name');
        }

        this.id = uuidv4();

        this.size = size;
        this.creator = creator;
        this.name = name;

        this.revisions = [];
        this.revisions.push(new Revision(this));

    }

    draft() {

        const latestRevision = this.revisions[this.revisions.length - 1];

        const newRevision = latestRevision.clone();

        this.revisions.push(newRevision);

        return this;
    }

    static get MIN_SIZE() { return 3; };
    static get MAX_SIZE() { return 15; };
}

Maze.from = (props) => {
    const { id, size, creator, name } = props;

    if (typeof id !== 'string' || id === '') {
        throw new Error('Invalid ID');
    }

    const maze = new Maze(size, creator, name);
    maze.id = id;

    return maze;
};

module.exports = Maze;
