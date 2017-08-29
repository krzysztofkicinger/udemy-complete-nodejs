const mongoose = require('../server/db/mongoose');
const { ObjectID } = require('mongodb');
const Todo = require('../server/model/Todo');
const User = require('../server/model/User');
const winston = require('winston');

Todo.find({
    _id: '59a54d865c2ab217940a7a88'
}).then(todos => console.log(todos));


Todo.findOne({
    _id: '59a54d865c2ab217940a7a88'
}).then(todo => console.log(todo));

Todo.findById('59a54d865c2ab217940a7a88')
    .then(todo => console.log(todo));