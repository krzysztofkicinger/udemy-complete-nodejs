const mongoose = require('mongoose');
const winston = require('winston');

// Mongoose provides both callbacks and Promise communication, choosing Promise
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

process.on('exit', () => {
    mongoose.disconnect();
});

module.exports = mongoose;