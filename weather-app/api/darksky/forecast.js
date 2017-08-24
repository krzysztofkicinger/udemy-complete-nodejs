const request = require('request');
const {
    encodeAddress,
    isOkRequest,
    isAtLeastOneResult
} = require('../api-helpers');

const FORECAST_URL = 'https://api.darksky.net/forecast';
const API_KEY = process.env.DARK_SKY_API_KEY;

module.exports.forecast = (latitude, longitude) => new Promise((resolve, reject) => {
    request.get({
        url: `${FORECAST_URL}/${API_KEY}/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if(error) {
            reject('Unable to connect to DarkSky servers');
        }
        if(isOkRequest(response)) {
            resolve(body.currently);
        }
    });
});