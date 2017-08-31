const request = require('supertest');
const authDriver = require('../../adapters/auth/mock');
const app = require('./index')(authDriver);

/*

    States
    a. Unauthenticated
    b. Unauthenticated with valid token
    c. Unauthenticated (with invalid token) - same as 1
    d. Authenticated

    Pages
    1. App Pages
    2. Login Page
    3. Request Token
    4. Accept Token

    1abc. App pages redirect to login.
    1d. If authenticated, app page is accessible.
    2abc. Login page is accessible.
    2d. Login page redirects somewhere.
    3abcd. POST to Request token sends request (GET does nothing)
    4ac. If unauthenticated with no valid token, reject (403)
    4b. If providing a valid token, redirect to origin.
    4d. If already authenticated, redirect to origin.
*/

describe('App', () => {

    describe('authentication', () => {

        const ned = 'ned@stark.example.com';

        beforeAll((done) => {
            authDriver.store.clear(done);
        });

        describe('when unauthenticated', () => {

            it('should make login page accessible', (done) => {

                request(app).
                get('/login/').
                expect(200).
                end(jasmine.finish(done));
            });

            it('should redirect app pages to login', (done) => {

                request(app).
                get('/foo/').
                expect(302).
                expect('Location', '/login/?origin=%2Ffoo%2F').
                end(jasmine.finish(done));
            });

            it('should redirect deeper app pages to login', (done) => {

                request(app).
                get('/foo/bar/baz/').
                expect(302).
                expect('Location', '/login/?origin=%2Ffoo%2Fbar%2Fbaz%2F').
                end(jasmine.finish(done));
            });

            it('should request a new token on POST to request URL', (done) => {

                expect(authDriver.store.length()).toBe(0);

                request(app).
                post('/login/request/').
                send({ user: ned }).
                set('Content-Type', 'application/json').
                expect(302).
                expect('Location', '/login/pending/').
                expect((res) => {

                    expect(authDriver.store.length()).toBe(1);
                }).
                end(jasmine.finish(done));
            });

            it('should reject bad tokens at the accept URL', (done) => {

                const token = authDriver.store.tokens[ned];

                request(app).
                get('/login/accept/').
                expect(401).
                end(jasmine.finish(done));
            });

        });

        describe('when authenticated', () => {

            let agent;

            beforeEach((done) => {
                done();
                // Authenticate an agent
                // agent = request.agent(app);
                //
                // agent.post('/login/request/').then((err, res) => {
                //
                //     return agent.get('/login/accept/');
                // }).then(jasmine.finish(done));
            });

            it('should redirect login page to some app page', () => {

                throw new Error('Unimplemented');
            });

            it('should make app pages accessible', () => {

                throw new Error('Unimplemented');
            });

            it('should accept and redirect any token request', () => {

                throw new Error('Unimplemented');
            });
        });

        it('should deny GET requests to the token request URL', () => {

            throw new Error('Unimplemented');
        });
    });
});
