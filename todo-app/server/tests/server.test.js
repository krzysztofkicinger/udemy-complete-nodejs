const expect = require('expect');
const request = require('supertest');
const app = require('../server');
const Todo = require('../model/Todo');

describe('POST /todos', () => {

    beforeEach((done) => {
        Todo.remove({})
            .then(() => done())
            .catch(error => console.log(error));
    });

    it('Should create a new todo', (done) => {
        const text = 'Text todo text';
        request(app).post('/todos')
            .send({ text })
            .expect(201)
            .expect(response => {
                expect(response.body.text).toBe(text);
            })
            .end((error, response) => {
                if(error) {
                    return done(error);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(error => console.log(error));
            });
    });

    it('Should not create todo with invalid body data', done => {
        const text = 'Text todo text';
        request(app).post('/todos')
            .send()
            .expect(400)
            .expect(response => {
                expect(response.body.errors).toExist();
            })
            .end((error, response) => {
                if(error) {
                    return done(error);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch(error => console.log(error));
            });
    });

});