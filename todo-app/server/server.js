const mongoose = require('./db/mongoose');
const { ObjectID } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const Todo = require('./model/Todo');
const User = require('./model/User');
const winston = require('winston');


const app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
    new Todo({ text: request.body.text }).save()
        .then(todo => {
            // winston.info('Todo has been created', todo);
            response.status(201).send(todo);
        })
        .catch(error => {
            // winston.error('Error occured during todo creation', error);
            response.status(400).send(error);
        });
});

app.get('/todos', (request, response) => {
    Todo.find().then(todos => {
        response.status(200).send(todos);
    }).catch(error => {
        response.status(400).send(error);
    });
});

app.get('/todos/:id', (request, response) => {
    Todo.findById(request.params.id)
        .then(todo => {
            response.status(200).send(todo);
        }).catch(error => {
            response.status(400).send(error);
        });
    console.log(`Id: `, request.params.id);
});

app.listen(3000, () => {
    winston.info(`Server is listening on port ${3000}`)
});

module.exports = app;