const geocode = require('./api/geocode/geocode');
const forecast = require('./api/darksky/forecast');
const yargs = require('yargs');
const winston = require('winston');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('h', 'help')
    .argv;

geocode.geocodeAddress(argv.address)
    .then(address => forecast.forecast(address.latitude, address.longitude))
    .then(result => winston.info(result))
    .catch(error => winston.error(error));