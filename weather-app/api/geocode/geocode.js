const request = require('request');
const {
    encodeAddress,
    isOkRequest,
    isAtLeastOneResult
} = require('../api-helpers');

module.exports.geocodeAddress = (address, callback) => {
    request.get({
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        qs: {
            address: encodeAddress(address)
        },
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to Google servers');
        }
        if(isOkRequest(response)) {
            if(isAtLeastOneResult(body)) {
                const { formatted_address, geometry: { location: { lat, lng } } } = body.results[0];
                callback(null, {
                    address: formatted_address,
                    latitude: lat,
                    longitude: lng
                });
            } else {
                callback('Unable to find that address');
            }
        }
    });
};