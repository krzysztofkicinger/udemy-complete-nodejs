const request = require('request');
const axios = require('axios');
const {
    encodeAddress,
    isOkRequest,
    isAtLeastOneResult
} = require('../api-helpers');

module.exports.geocodeAddress = (address) => {
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params : {
            address: encodeAddress(address)
        }
    }).then(response => {
        if(isOkRequest(response) && !isAtLeastOneResult(response.data)) {
           throw new Error('Unable to find that address');
        } else {
            const { formatted_address, geometry: { location: { lat, lng } } } = response.data.results[0];
            return {
                address: formatted_address,
                latitude: lat,
                longitude: lng
            };
        }
    }).catch(error => {
        console.log(error)
    });
};

// module.exports.geocodeAddress = (address) => {
//     return new Promise((resolve, reject) => {
//         request.get({
//             url: 'https://maps.googleapis.com/maps/api/geocode/json',
//             qs: {
//                 address: encodeAddress(address)
//             },
//             json: true
//         }, (error, response, body) => {
//             if(error) {
//                 reject('Unable to connect to Google servers');
//             }
//             if(isOkRequest(response)) {
//                 if(isAtLeastOneResult(body)) {
//                     const { formatted_address, geometry: { location: { lat, lng } } } = body.results[0];
//                     resolve({
//                         address: formatted_address,
//                         latitude: lat,
//                         longitude: lng
//                     });
//                 } else {
//                     reject('Unable to find that address');
//                 }
//             }
//         });
//     });
// };