const Revision = require('./revision');

module.exports = class Maze {

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
