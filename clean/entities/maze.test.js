const Maze = require('./maze');

// TODO - Use fixtures rather than requiring multiple models
const User = require('./user');
const Revision = require('./revision');

describe('Maze model', () => {

    describe('when it is created', () => {

        const ned = new User(1, 'ned@stark.example.com', 'Ned Stark');
        const size = 9;
        const name = 'Crypts of Winterfell';

        const maze = new Maze(size, ned, name);

        it('should have one, empty revision', () => {

            expect(maze.revisions).not.toBeNull();
            expect(maze.revisions.length).toBe(1);

            // TODO - This should live in a map helpers module?
            expect(Revision.sizeOf(maze.revisions[0])).toBe(size);
            expect(Revision.isEmpty(maze.revisions[0])).toBe(true);
        });

        it('should have a name', () => {

            expect(maze.name).toBe(name);

            expect(() => new Maze(size, ned, null)).toThrow();
            expect(() => new Maze(size, ned)).toThrow();
            expect(() => new Maze(size, ned, '')).toThrow();
        });

        it('should have a size between MIN and MAX', () => {

            expect(maze.size).toBe(size);

            expect(() => new Maze(null, ned, name)).toThrow();
            expect(() => new Maze('hello', ned, name)).toThrow();
            expect(() => new Maze(Maze.MIN_SIZE - 1, ned, name)).toThrow();
            expect(() => new Maze(Maze.MAX_SIZE, ned, name)).toThrow();
            expect(() => new Maze(9.2, ned, name)).toThrow();
            expect(() => new Maze()).toThrow();
        });

        it('should have a creator', () => {

            expect(maze.creator).toBe(ned);

            expect(() => new Maze(size, null, name)).toThrow();
            expect(() => new Maze(size)).toThrow();
            expect(() => new Maze(size, 'Hello', name)).toThrow();
        });
    });

    describe('when it is drafted', () => {

        it('should clone a new revision', () => {

            const ned = new User(1, 'ned@stark.example.com', 'Ned Stark');
            const size = 9;
            const name = 'Crypts of Winterfell';

            const maze = new Maze(size, ned, name);
            const oldDraft = maze.revisions[0];
            spyOn(oldDraft, 'clone').and.callThrough();

            expect(maze.revisions.length).toBe(1);

            maze.draft();

            expect(maze.revisions.length).toBe(2);
            expect(maze.revisions[1].version).toBe(1);
            expect(oldDraft.clone).toHaveBeenCalled();
        });

        it('should be repeatable', () => {

            const ned = new User(1, 'ned@stark.example.com', 'Ned Stark');
            const size = 9;
            const name = 'Crypts of Winterfell';

            const maze = new Maze(size, ned, name);
            const oldDraft = maze.revisions[0];
            spyOn(oldDraft, 'clone').and.callThrough();

            expect(maze.revisions.length).toBe(1);

            maze.draft();
            maze.draft();
            maze.draft();

            expect(maze.revisions.length).toBe(4);
            expect(maze.revisions[3].version).toBe(3);
            expect(oldDraft.clone.calls.count()).toBe(1);
        });

        it('should be chainable', () => {
            const ned = new User(1, 'ned@stark.example.com', 'Ned Stark');
            const size = 9;
            const name = 'Crypts of Winterfell';

            const maze = new Maze(size, ned, name);

            expect(() => maze.draft().draft().draft()).not.toThrow();
        });
    });
});
