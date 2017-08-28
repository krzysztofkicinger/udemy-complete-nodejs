const request = require('supertest');
const expect = require('expect');
const app = require('./server');

describe('GET /', () => {
    it('Should respond with "Hello world"', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .expect((response) => {
                response.body = 'Hello World!'
            })
            .end(done);
    });

    it('GET /error should respond with error message', (done) => {
        request(app)
            .get('/error')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404, {
                error: 'Page not found.'
            })
            .expect((response) => {
                expect(response.body).toInclude({
                    error: 'Page not found.'
                });
            })
            .end(done);
    });

    it('GET /users should respond with table of users', (done) => {
        request(app)
            .get('/users')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .expect((response) => {
                expect(response.body)
                    .toBeA('array')
                    .toInclude({
                        name: 'John',
                        age: 22
                    });
            })
            .end(done);
    });
});
