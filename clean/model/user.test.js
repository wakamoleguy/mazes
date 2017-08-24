const User = require('./user');

describe('User', () => {

    describe('when it is created', () => {

        const id = 123;
        const email = 'ned@stark.example.com';
        const display = 'Ned Stark';

        const user = new User(id, email, display);

        it('should have a unique identifier separate from its email', () => {

            expect(user.id).toEqual(id);
            expect(user.id).not.toEqual(user.email);

            expect(() => new User(null, email, display)).toThrow();
            expect(() => new User(email, email, display)).toThrow();
            expect(() => new User()).toThrow();
        });

        it('should have an email address', () => {

            expect(user.email).toEqual(email);

            expect(() => new User(id, null, display)).toThrow();
            expect(() => new User(id, '', display)).toThrow();
            expect(() => new User(id)).toThrow();
        });

        it('should have a display name', () => {

            expect(user.display).toEqual(display);

            expect(() => new User(id, email, null)).toThrow();
            expect(() => new User(id, email)).toThrow();
            expect(() => new User(id, email, '')).toThrow();
        });
    });
});
