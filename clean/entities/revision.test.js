const Revision = require('./revision');

// TODO - Use fixtures rather than requiring multiple models
const Maze = require('./maze');
const User = require('./user');

describe('Revision model', () => {

    describe('when it is created', () => {

        const ned = new User('ned@stark.example.com', 'Ned Stark');
        const size = 9;
        const name = 'Crypts of Winterfell';

        const maze = new Maze(size, ned, name);

        const revision = new Revision(maze);

        it('should create a unique ID if none provided', () => {

            const firstRevision = new Revision(maze);
            const secondRevision = new Revision(maze);

            expect(firstRevision.id).not.toBe(null);
            expect(secondRevision.id).not.toBe(null);
            expect(secondRevision.id).not.toBe(firstRevision.id);
        });

        it('should be an empty maze', () => {

            // Cannot use isEmpty here, because isEmpty depends on new
            expect(revision.map.length).toBe(size);
            revision.map.forEach((row) => {

                expect(row.length).toBe(size);

                row.forEach((tile) => {
                    expect(tile).toBe(0);
                });
            });
        });

        it('should have a version', () => {

            // We cannot delete revisions from the maze right now,
            // so each revision version in the maze matches its index.
            // This revision has not been added, so it matches the next
            // available index.
            expect(revision.version).toBe(maze.revisions.length);
        });

        it('should belong to a maze', () => {

            expect(revision.maze).toBe(maze);

            expect(() => new Revision()).toThrow();
            expect(() => new Revision(9)).toThrow();
            expect(() => new Revision(Maze.MIN_SIZE)).toThrow();
            expect(() => new Revision(ned)).toThrow();
            expect(() => new Revision(revision)).toThrow();
        });

        it('should have a start and destination', () => {

            expect(revision.start).toEqual({ z: 0, x: 0, direction: 'east' });
            expect(revision.destination).toEqual({ z: 0, x: -1 });
        });

        it('should not add itself to the maze', () => {

            // Maze still only has its first draft
            expect(maze.revisions.length).toBe(1);
            expect(maze.revisions.indexOf(revision)).toBe(-1);
        });

    });

    describe('when cloned', () => {

        const ned = new User('ned@stark.example.com', 'Ned Stark');
        const size = 9;
        const name = 'Crypts of Winterfell';

        const maze = new Maze(size, ned, name);

        // TODO - When adding ability to edit the revision, test with changes
        const original = new Revision(maze);

        it('should make a copy with a higher version', () => {
            const version = original.version;

            const clone = original.clone();

            expect(clone.maze).toBe(original.maze);
            expect(clone.version).toBe(version + 1);

            // Clones the info, without reusing the objects
            expect(clone.start).toEqual(original.start);
            expect(clone.start).not.toBe(original.start);
            expect(clone.destination).toEqual(original.destination);
            expect(clone.destination).not.toBe(original.destination);

            expect(
                clone.map.every(
                    (row, z) => row.every(
                        (tile, x) => tile === original.map[z][x]
                    )
                )
            ).toBe(true);
        });

        it('should have a new id', () => {

            const id = original.id;

            const clone = original.clone();

            expect(clone.id).not.toBe(null);
            expect(clone.id).not.toBe(id);
        });

        it('should not touch the original', () => {
            const version = original.version;
            const start = original.start;
            const destination = original.destination;

            original.clone();
            expect(original.version).toBe(version);
            expect(original.start).toBe(start);
            expect(original.destination).toBe(destination);
        });

        it('should not share map tiles', () => {

            const clone = original.clone();

            expect(original.map[0][0]).toBe(0);
            expect(clone.map[0][0]).toBe(0);

            clone.map[0][0] = 1;

            expect(original.map[0][0]).toBe(0);
            expect(clone.map[0][0]).toBe(1);

        });
    });

    describe('isEmpty', () => {

        const ned = new User('ned@stark.example.com', 'Ned Stark');
        const size = 9;
        const name = 'Crypts of Winterfell';
        const maze = new Maze(size, ned, name);

        it('should return true when the maze is all 0s', () => {

            const revision = new Revision(maze);

            expect(Revision.isEmpty(revision)).toBe(true);
        });

        it('should return false when the maze has a nonzero', () => {

            const revision = new Revision(maze);
            revision.map[1][1] = 1;

            expect(Revision.isEmpty(revision)).toBe(false);

            revision.map[1][1] = 0;
            revision.map[7][8] = 1;
            expect(Revision.isEmpty(revision)).toBe(false);

            revision.map[7][8] = 0;
            revision.map[0][0] = 1;
            expect(Revision.isEmpty(revision)).toBe(false);
        });

        it('should work on larger mazes', () => {
            const bigSize = Maze.MAX_SIZE - 1;

            const bigMaze = new Maze(bigSize, ned, name);
            const revision = new Revision(bigMaze);

            expect(Revision.isEmpty(revision)).toBe(true);

            revision.map[bigSize - 1][bigSize - 1] = 1;
            expect(Revision.isEmpty(revision)).toBe(false);
        });
    });
});
