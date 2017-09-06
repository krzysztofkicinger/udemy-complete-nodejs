const mongoose = require('mongoose');
const winston = require('winston');

// Mongoose provides both callbacks and Promise communication, choosing Promise
mongoose.Promise = global.Promise;

const env = process.env.NODE_ENV || 'development';
const mongoDBConnectionPath = process.env.MONGODB_URL || `mongodb://localhost:27017/TodoApp${env === 'test' ? 'Test' : ''}`;

mongoose.connect(mongoDBConnectionPath);

process.on('exit', () => {
    mongoose.disconnect();
});

module.exports = mongoose;