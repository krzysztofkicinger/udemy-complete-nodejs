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

app.listen(3000);

module.exports = app;