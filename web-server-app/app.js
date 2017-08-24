const express = require('express');
const circularJson = require('circular-json');

const app = express();

app.get('/', (request, response) => {
    response.set({
        'Content-Type': 'application/json'
    });
    response.send(circularJson.stringify(request));
});

app.listen(3000, () => {
    console.log('Express application starter callback');
});