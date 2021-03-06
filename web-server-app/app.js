const express = require('express');
const circularJson = require('circular-json');
const hbs = require('hbs');
const winston = require('winston');
const fs = require('fs');

const app = express();

// Register partial views that can be accessed in hbs {{ > <name_before_.hbs> }}
hbs.registerPartials(`${__dirname}/public/partials`);

// Configuration of hbs template engine
app.set('view engine', 'hbs');
// Where hbs views should be found (main page), specified in the response.render('name>', ...) method
app.set('views', `${__dirname}/public`);

// Defining middleware function
app.use((request, response, next) => {
    fs.appendFile('server.log', `${new Date()}: ${request.method} ${request.url}\n`);
    // winston.info()
    next(); // Must be called to move to the next handler
});

// app.use((request, response, next) => {
//     response.render('technical_break.hbs', {
//         title: 'Maintenance'
//     });
// });

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (request, response) => {
    response.render('index.hbs', {
        title: 'Index page',
        welcomeMessage: 'Welcome to my website',
    });
});

app.get('/html', (request, response) => {
    response.send('<h1>Hello Express!</h1>');
});

app.get('/about', (request, response) => {
    // Renders .hbs page (set as a view engine) and passes an object with arguments
    response.render('about.hbs', {
        title: 'About page',
    });
});

app.get('/bad', (request, response) => {
    response.json({
        errorMessage: 'Unable to handle request'
    })
});

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        title: 'Portfolio',
    });
});

// Configuration for heroku
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});