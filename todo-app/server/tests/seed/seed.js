const { ObjectID } = require('mongodb');
const Todo = require('../../model/Todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First Todo object'
}, {
    _id: new ObjectID(),
    text: 'Second Todo object',
    completed: true,
    completedAt: 333
}];

const populateTodos = (done) => {
    Todo.remove({})
        .then(() => Todo.insertMany(todos))
        .then(() => done())
        .catch(error => console.log(error));
};

module.exports = {
    todos,
    populateTodos
};