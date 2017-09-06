const mongoose = require('./db/mongoose');
const { ObjectID } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const Todo = require('./model/Todo');
const User = require('./model/User');
const winston = require('winston');
const _ = require('lodash');

const app = express();
const port = process.env.PORT || 3000;

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
    const id = request.params.id;
    console.log(`Id: ${id}`);
    if(!ObjectID.isValid(id)) {
        response.status(404).send('Id not valid.');
    } else {
        Todo.findById(id).then(todo => {
                if(!todo) {
                    response.status(404).send();
                }
                response.status(200).send(todo);
            }).catch(error => response.status(400).send(error));

    }

    console.log(`Id: `, request.params.id);
});

app.delete('/todos/:id', (request, response) => {
    const id = request.params.id;
    if(!ObjectID.isValid(id)) {
        response.status(404).send('Id not valid.');
    } else {
        Todo.findByIdAndRemove(id).then(todo => {
            if(!todo) {
                response.status(404).send();
            }
            response.status(200).send(todo);
        }).catch(error => response.status(400).send(error));
    }
});

app.patch('/todos/:id', (request, response) => {
    const id = request.params.id;
    const body = _.pick(request.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        response.status(404).send('Id not valid');
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then(todo => {
        if(!todo) {
            response.status(404).send();
        }
        response.status(200).send(todo);
    }).catch(error => {
        response.status(400).send(error);
    })
});

app.listen(port, () => {
    winston.info(`Server is listening on port ${port}`)
});

module.exports = app;