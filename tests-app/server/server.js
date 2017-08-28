const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.send('Hello World!');
});

app.get('/error', (request, response) => {
    response
        .status(404)
        .json({
            error: 'Page not found.'
        });
});

app.get('/users', (request, response) => {
    response.json([{
        name: 'Andrew',
        age: 25
    }, {
        name: 'John',
        age: 22
    }, {
        name: 'Chris',
        age: 35
    }])
});

app.listen(3000);

module.exports = app;