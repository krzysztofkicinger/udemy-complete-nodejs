const mongoose = require('./db/mongoose');
const { ObjectID } = require('mongodb');
const Todo = require('./model/Todo');
const User = require('./model/User');
const winston = require('winston');


// Remove everything from the collection
Todo.remove({}).then(result => {
    winston.info(`Removing all: ${result}`);
});


// Remove one
Todo.findOneAndRemove({
    _id: ''
}).then(todo => {
    winston.info(todo);
});


Todo.findByIdAndRemove('').then(todo => {
    winston.info(todo);
});

