const expect = require('expect');
const request = require('supertest');
const app = require('../server');
const Todo = require('../model/Todo');

beforeEach((done) => {
    Todo.remove({})
        .then(() => done())
        .catch(error => console.log(error));
});

describe('POST /todos', () => {

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

describe('GET /todos', () => {

    beforeEach((done) => {
        Todo.insertMany([{
            text: 'First test todo'
        }, {
            text: 'Second test todo'
        }])
            .then(() => done())
            .catch(error => console.log(error));
    });

    it('Should return all todos in the database', (done) => {
        const text = 'Text todo text';
        request(app).get('/todos')
            .send({ text })
            .expect(200)
            .expect(response => {
                expect(response.body).toBeA('array');
                expect(response.body.length).toBe(2);
            })
            .end(done);
    });

    describe('/:id', () => {

        it('Should return single todo from the database', (done) => {
            Todo.findOne({}).then(todo => {
                const id = todo._id;
                request(app)
                    .get(`/todos/${id}`)
                    .expect(200)
                    .expect(response => {
                        console.log(response.body);
                        expect(response.body).toBeA('object');
                        expect(response.body._id).toEqual(id);
                    })
                    .end(done);
            });
        });

    });

});
