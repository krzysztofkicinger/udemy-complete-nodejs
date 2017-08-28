const request = require('supertest');
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
    })

    it('GET /error should respond with error message', (done) => {
        request(app)
            .get('/error')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404, {
                error: 'Page not found.'
            })
            .end(done);
    })
});
