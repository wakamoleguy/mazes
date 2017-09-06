const User = require('./user');

describe('User', () => {

    const email = 'ned@stark.example.com';
    const display = 'Ned Stark';

    describe('when it is created', () => {

        const user = new User(email, display);

        it('should create a unique ID if none provided', () => {

            const newUser = new User(email, display);

            expect(newUser.id).not.toBe(null);
            expect(newUser.id).toBe(`id:${email}`);
        });

        it('should have an email address', () => {

            expect(user.email).toEqual(email);

            expect(() => new User(null, display)).toThrow();
            expect(() => new User('', display)).toThrow();
            expect(() => new User()).toThrow();
        });

        it('should have a display name', () => {

            expect(user.display).toEqual(display);

            expect(() => new User(email, null)).toThrow();
            expect(() => new User(email)).toThrow();
            expect(() => new User(email, '')).toThrow();
        });
    });

    describe('when made from existing properties', () => {

        const id = 'id:123';

        it('should have a unique identifier separate from its email', () => {

            const user = User.from({
                id,
                email,
                display
            });

            expect(user.id).toEqual(id);
            expect(user.id).not.toEqual(user.email);

            expect(() => User.from({
                id: email,
                email,
                display
            })).toThrow();
            expect(() => User.from({
                email,
                display
            })).toThrow();
            expect(() => User.from({})).toThrow();
        });
    });
});
