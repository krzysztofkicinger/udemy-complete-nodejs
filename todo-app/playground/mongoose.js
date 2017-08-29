const mongoose = require('../server/db/mongoose');
const { ObjectID } = require('mongodb');
const Todo = require('../server/model/Todo');
const User = require('../server/model/User');
const winston = require('winston');

console.log(`ObjectID Valid: ${ObjectID.isValid('59a54d865c2ab217940a7a88')}`)
console.log(`ObjectID Valid: ${ObjectID.isValid('59a54d865c2ab275940a7a80')}`)

Todo.find({
    _id: '59a54d865c2ab217940a7a88'
}).then(todos => console.log(todos));

Todo.findOne({
    _id: '59a54d865c2ab217940a7a88'
}).then(todo => console.log(todo));

Todo.findById('59a54d865c2ab217940a7a88')
    .then(todo => console.log(todo));