const mongoose = require('mongoose');

// Mongoose provides both callbacks and Promise communication, choosing Promise
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = mongoose;