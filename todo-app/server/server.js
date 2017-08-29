const mongoose = require('mongoose');
const Todo = require('./model/Todo');
const User = require('./model/User');

// Mongoose provides both callbacks and Promise communication
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

// const newTodo = new Todo({
//     text: '  Edit this video '
// });
//
// newTodo.save().then(data => {
//     console.log('Saved todo', data);
// }, error => {
//     console.log('Error during saving todo', error);
// });

// const completeTodo = new Todo({
//     text: 'Go shopping',
//     completed: false,
//     completedAt: 1
// });
//
// completeTodo.save()
//     .then(data => console.log('Saved todo', data))
//     .catch(error => console.log('Error occurred', error));

const user = new User({
    email: 'test@example.com'
});

user.save()
    .then(data => console.log(data))
    .catch(error => console.log(error));

mongoose.disconnect();