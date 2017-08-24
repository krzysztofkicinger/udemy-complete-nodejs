const request = require('request');

module.exports.geocodeAddress = (address) => {
    request.get({
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        qs: {
            address: encodeAddress(address)
        },
        json: true
    }, (error, response, body) => {
        if(error) {
            console.log('Unable to connect to Google servers', error);
        }
        if(isOkRequest(response)) {
            if(isAtLeastOneResult(body)) {
                console.log(`Formatted address: ${body.results[0].formatted_address}`)
                console.log(`[Lat, Lng]: ${body.results[0].geometry.location.lat}, ${body.results[0].geometry.location.lng}`)
            } else {
                console.log(response);
            }
        }
    });
};

// const prettyStringify = (object) => {
//     return JSON.stringify(object, undefined, 4);
// };

const encodeAddress = (address) => {
    return encodeURIComponent(address)
};

const isOkRequest = (request) => {
    return request.statusCode === 200;
};

const isAtLeastOneResult = (body) => {
    return !(body.status === 'ZERO_RESULTS');
};