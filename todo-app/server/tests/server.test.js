const expect = require('expect');
const request = require('supertest');
const app = require('../server');
const Todo = require('../model/Todo');
const User = require('../model/User');
const { ObjectID } = require('mongodb');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

beforeEach(populateTodos);
beforeEach(populateUsers);

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
                    expect(todos.length).toBe(3);
                    // expect(todos[0].text).toBe(text);
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
                    expect(todos.length).toBe(2);
                    done();
                }).catch(error => console.log(error));
            });
    });

});

describe('GET /todos', () => {

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
                        expect(response.body).toBeA('object');
                        expect(response.body._id).toEqual(id);
                    })
                    .end(done);
            });
        });

        it('Should return 404 with when id is not valid', (done) => {
            request(app)
                .get(`/todos/non_valid_id`)
                .expect(404)
                .end(done);
        });

        it('Should return 404 for nonexisting id', (done) => {
            const id = new ObjectID().toHexString();
            request(app)
                .get(`/todos/${id}`)
                .expect(404)
                .end(done);
        });


    });

});

describe('DETELE /todos/:id', () => {

    let id;

    beforeEach((done) => {
        Todo.findOne({}).then(todo => {
            id = todo._id;
            done();
        });
    });

    it('Should delete document when called', done => {
        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect(response => {
                expect(response.body._id).toEqual(id);
            })
            .end(done);
    });

    it('Should return 400 if invalid id', done => {
        request(app)
            .delete(`/todos/non_valid_id`)
            .expect(404)
            .end(done);
    })

});

describe('PATH /todos/:id', () => {

    let id;
    let text;

    beforeEach((done) => {
        Todo.findOne({}).then(todo => {
            id = todo._id;
            text = todo.text;
            done();
        });
    });

    it('Should update document when called', done => {
        request(app)
            .patch(`/todos/${id}`)
            .send({
                text
            })
            .expect(200)
            .expect(response => {
                expect(response.body._id).toEqual(id);
                expect(response.body.text).toEqual(text);
                expect(response.body.completed).toEqual(false);
                expect(response.body.completedAt).toNotExist();
            })
            .end(done);
    });

    it('Should complete todo when passed completed flag', done => {
        request(app)
            .patch(`/todos/${id}`)
            .send({
                text,
                completed: true
            })
            .expect(200)
            .expect(response => {
                expect(response.body._id).toEqual(id);
                expect(response.body.text).toEqual(text);
                expect(response.body.completed).toEqual(true);
                expect(response.body.completedAt).toExist();
            })
            .end(done);
    });

    it('Should return 400 if invalid id', done => {
        request(app)
            .patch(`/todos/non_valid_id`)
            .expect(404)
            .end(done);
    })

});

describe('GET /users/me', () => {

    it('Should return user if authenticated', (done) => {
        const user = users[0];
        request(app)
            .get('/users/me')
            .set('x-auth', user.tokens[0].token)
            .expect(200)
            .expect(response => {
                expect(response.body._id).toBe(user._id.toHexString());
                expect(response.body.email).toBe(user.email);
            })
            .end(done);
    });

    it('Should return 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect(response => {
                expect(response.body).toEqual({})
            })
            .end(done);
    })

});

describe('POST /users', () => {

    it('Should create a user', (done) => {
        const email = 'example@example.com';
        const password = '123mnb!';

        request(app)
            .post('/users')
            .send({
                email,
                password
            })
            .expect(200)
            .expect(response => {
                expect(response.headers['x-auth']).toExist();
                expect(response.body._id).toExist();
                expect(response.body.email).toBe(email);
            })
            .end(error => {
                if(error) {
                    return done(error);
                }

                User.findOne({
                    email
                }).then(user => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                }).then(done);
            })
    });

    it('Should return validation errors if request invalid', (done) => {
        const invalid_email = 'example.com';
        const invalid_password = 'asd';

        request(app)
            .post('/users')
            .send({
                email: invalid_email,
                password: invalid_password
            })
            .expect(400)
            .expect(response => {
                expect(response.headers['x-auth']).toNotExist();
                expect(response.body.errors.email).toExist();
                expect(response.body.errors.password).toExist();
            })
            .end(done);
    });

    it('Should not create user if email in use', (done) => {
        const user = users[0];
        const password = '123mnb!';

        request(app)
            .post('/users')
            .send({
                email: user.email,
                password: password
            })
            .expect(400)
            .expect(response => {
                expect(response.headers['x-auth']).toNotExist();
                expect(response.body.errmsg).toInclude('duplicate key error collection');
            })
            .end(done);
    });

    describe('/login', () => {

        it('Should enable login user with correct credentials', (done) => {
            const user = users[0];

            request(app)
                .post('/users/login')
                .send({
                    email: user.email,
                    password: user.password
                })
                .expect(200)
                .expect(response => {
                    expect(response.headers['x-auth']).toExist();
                })
                .end(done);
        });

        it('Should not login user when wrong credentials are passed', (done) => {
            const email = users[0].email;
            const invalid_password = 'InvalidPassword';

            request(app)
                .post('/users/login')
                .send({
                    email: email,
                    password: invalid_password
                })
                .expect(400)
                .expect(response => {
                    expect(response.headers['x-auth']).toNotExist();
                })
                .end(done);
        })

    });

});
