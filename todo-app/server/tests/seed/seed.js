const { ObjectID } = require('mongodb');
const jwt  = require('jsonwebtoken');
const Todo = require('../../model/Todo');
const User = require('../../model/User');

const todos = [{
    _id: new ObjectID(),
    text: 'First Todo object'
}, {
    _id: new ObjectID(),
    text: 'Second Todo object',
    completed: true,
    completedAt: 333
}];

const userOneId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'test@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
    }]
}, {
    _id: new ObjectID(),
    email: 'test2@example.com',
    password: 'userTwoPass',
}];

const populateTodos = (done) => {
    Todo.remove({})
        .then(() => Todo.insertMany(todos))
        .then(() => done())
        .catch(error => console.log(error));
};

// We need to save objects separately, because we want middleware to be used
// If we used insertMany, then middleware (password hashing) would no be used
const populateUsers = (done) => {
    User.remove({})
        .then(() => {
            const userOne = new User(users[0]).save();
            const userTwo = new User(users[1]).save();

            return Promise.all([userOne, userTwo])
        })
        .then(() => done())
        .catch((error) => console.log(error));
};

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
};