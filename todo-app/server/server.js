const mongoose = require('mongoose');
const Todo = require('./model/Todo');

// Mongoose provides both callbacks and Promise communication
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

const newTodo = new Todo({
    text: 'Cook dinner'
});

newTodo.save().then(data => {
    console.log('Saved todo', data);
}, error => {
    console.log('Error during saving todo', error);
});

const completeTodo = new Todo({
    text: 'Go shopping',
    completed: false,
    completedAt: 1
});

completeTodo.save()
    .then(data => console.log('Saved todo', data))
    .catch(error => console.log('Error occurred', error));