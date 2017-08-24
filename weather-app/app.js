const request = require('request');

request.get({
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    qs: {
        address: 'address=Cracow Poland'
    },
    json: true
}, (error, response, body) => {
    if(response.statusCode === 200) {
        console.log(`Formatted address: ${body.results[0].formatted_address}`)
        console.log(`[Lat, Lng]: ${body.results[0].geometry.location.lat}, ${body.results[0].geometry.location.lng}`)
        // console.log(`Body: `, prettyStringify(body));
    } else {
        console.log(`Error: ${error}`);
        console.log(`Response:`, response);
    }
});

const prettyStringify = (object) => {
    return JSON.stringify(object, undefined, 4);
};