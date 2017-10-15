const uuidv4 = require('uuid/v4');

class Revision {

    constructor(maze) {

        if (maze === null || maze === undefined) {
            throw new Error('Revision must have a Maze');
        }

        if (!Array.isArray(maze.revisions)) {
            throw new Error('Maze must have list of Revisions');
        }

        if (!Number.isInteger(maze.size)) {
            throw new Error('Maze must have an integer Size');
        }

        this.id = uuidv4();

        const size = maze.size;

        this.map = new Array(size).fill().map(() => new Array(size).fill(0));

        const lastVersion = maze.revisions.length === 0?
            -1:
            maze.revisions[maze.revisions.length-1].version;

        this.version = lastVersion + 1;

        this.start = {
            z: 0,
            x: 0,
            direction: 'east'
        };

        this.destination = {
            z: 0,
            x: -1
        };

        this.maze = maze;
    }

    clone() {

        const cloneRevision = new Revision(this.maze);

        cloneRevision.map = this.map.map(
            (row, z) => row.map(
                (_, x) => this.map[z][x]
            )
        );

        cloneRevision.version = this.version + 1;

        return cloneRevision;
    }

    static isEmpty(revision) {

        if (revision.map === undefined || revision.map === null) {
            throw new Error('Invalid Revision: no map found');
        }

        return revision.map.every((row) => row.every((tile) => tile === 0));
    }

    static sizeOf(revision) {

        if (revision.map === undefined || revision.map === null) {
            throw new Error('Invalid Revision: no map found');
        }

        return revision.map.length;
    }
}

module.exports = Revision;
