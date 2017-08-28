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
});
