const request = require('request');
const {
    encodeAddress,
    isOkRequest,
    isAtLeastOneResult
} = require('../api-helpers');

const FORECAST_URL = 'https://api.darksky.net/forecast';
const API_KEY = process.env.DARK_SKY_API_KEY;

module.exports.forecast = (latitude, longitude, callback) => {
    request.get({
        url: `${FORECAST_URL}/${API_KEY}/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to DarkSky servers');
        }
        if(isOkRequest(response)) {
                // const { summary, humidity, windSpeed, windBearing, visibilitty, cloudCover, pressure } = body.results[0];
                callback(null, body.currently);
        };
    });
};