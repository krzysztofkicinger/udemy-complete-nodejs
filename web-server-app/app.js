const express = require('express');
const circularJson = require('circular-json');

const app = express();

app.get('/', (request, response) => {
    response.set({
        'Content-Type': 'application/json'
    });
    response.send(circularJson.stringify(request));
});

app.get('/html', (request, response) => {
    response.send('<h1>Hello Express!</h1>');
});

app.get('/about', (request, response) => {
    response.send('About Page')
});


app.get('/bad', (request, response) => {
    response.json({
        errorMessage: 'Unable to handle request'
    })
});

app.listen(3000, () => {
    console.log('Express application starter callback');
});