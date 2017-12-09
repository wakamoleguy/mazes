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

    xdescribe('authentication', () => {

        const nedemail = 'ned@stark.example.com';
        const nedid = 'id:ned@stark.example.com';

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
                    send({ user: nedemail }).
                    set('Content-Type', 'application/json').
                    expect(302).
                    expect('Location', '/login/pending/').
                    expect(() => {

                        expect(authDriver.store.length()).toBe(1);
                    }).
                    end(jasmine.finish(done));
            });

            it('should reject bad tokens at the accept URL', (done) => {

                request(app).
                    get('/login/accept/').
                    expect(401).
                    end(jasmine.finish(done));
            });

            it('should accept good tokens at the accept URL', (done) => {

                const token = '123';
                const msToLive = 60 * 1000;
                const originUrl = '/foo/bar/origin/';

                authDriver.store.storeOrUpdate(
                    token, nedid, msToLive, originUrl, () => {});

                request(app).
                    get('/login/accept/' +
                    `?token=${token}&uid=${encodeURIComponent(nedid)}`).
                    expect(302).
                    expect('Location', originUrl).
                    end(jasmine.finish(done));
            });

            it('should redirect to somewhere if no origin', (done) => {

                const token = '123';
                const msToLive = 60 * 1000;
                const originUrl = null;

                authDriver.store.storeOrUpdate(
                    token, nedid, msToLive, originUrl, () => {});

                request(app).
                    get('/login/accept/' +
                    `?token=${token}&uid=${encodeURIComponent(nedid)}`).
                    expect(302).
                    end(jasmine.finish(done));
            });

        });

        describe('when authenticated', () => {
            const token = '123';
            const msToLive = 60 * 1000;

            let agent;

            beforeEach((done) => {
                authDriver.store.clear(() => {});
                authDriver.store.storeOrUpdate(
                    token, nedid, msToLive, null, () => {});

                agent = request.agent(app);

                // Authenticate an agent
                agent.
                    get('/login/accept/' +
                    `?token=${token}&uid=${encodeURIComponent(nedid)}`).
                    expect(302).
                    end(jasmine.finish(done));
            });

            it('should redirect login page to some app page', (done) => {

                agent.
                    get('/login/').
                    expect(302).
                    end(jasmine.finish(done));
            });

            it('should make app pages accessible', (done) => {

                agent.
                    get('/foo/').
                    expect(404).
                    end(jasmine.finish(done));
            });

            it('should make deeper app pages accessible', (done) => {
                agent.
                    get('/foo/bar/baz/').
                    expect(404).
                    end(jasmine.finish(done));
            });

            it('should accept and redirect any token request', (done) => {

                agent.
                    get('/login/accept/').
                    expect(302).
                    end(jasmine.finish(done));
            });
        });

        it('should deny GET requests to the token request URL', (done) => {

            request(app).
                get(`/login/request/?user=${encodeURIComponent(nedemail)}`).
                expect(403).
                end(jasmine.finish(done));
        });
    });
});
