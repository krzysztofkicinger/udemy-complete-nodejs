const request = require('request');

request.get({
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    qs: {
        address: 'address=Cracow Poland'
    },
    json: true
}, (error, response, body) => {
    if(response.statusCode === 200) {
        console.log(`Body: `, JSON.stringify(body));
    } else {
        console.log(`Error: ${error}`);
        console.log(`Response:`, response);
    }
});