const express = require('express');
const circularJson = require('circular-json');
const hbs = require('hbs');

const app = express();

// Configuration of hbs template engine
app.set('view engine', 'hbs');
// Where hbs views should be found (main page), specified in the response.render('name>', ...) method
app.set('views', `${__dirname}/public`);

app.use(express.static(`${__dirname}/public`));


app.get('/', (request, response) => {
    response.render('index.hbs', {
        title: 'Index page',
        welcomeMessage: 'Welcome to my website',
        currentYear: new Date().getFullYear()
    });
});

app.get('/html', (request, response) => {
    response.send('<h1>Hello Express!</h1>');
});

app.get('/about', (request, response) => {
    // Renders .hbs page (set as a view engine) and passes an object with arguments
    response.render('about.hbs', {
        title: 'About page',
        currentYear: new Date().getFullYear()
    });
});


app.get('/bad', (request, response) => {
    response.json({
        errorMessage: 'Unable to handle request'
    })
});

app.listen(3000, () => {
    console.log('Express application starter callback');
});