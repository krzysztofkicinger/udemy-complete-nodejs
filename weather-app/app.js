const geocode = require('./api/geocode/geocode');
const forecast = require('./api/darksky/forecast');
const yargs = require('yargs');

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

geocode.geocodeAddress(argv.address, (errorMessage, result) => {
    handleRequest(errorMessage, result, res => {
        const address = res;
        forecast.forecast(address.latitude, address.longitude, (errorMessage, result) => {
            handleRequest(errorMessage, result, res => {
                console.log(`Address: ${address.address}`);
                console.log(res)
            });
        });
    });
});

const handleRequest = (errorMessage, result, callback) => {
    if(errorMessage) {
        console.error(errorMessage);
    } else {
        callback(result);
    }
};