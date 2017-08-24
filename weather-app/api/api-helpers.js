// const prettyStringify = (object) => {
//     return JSON.stringify(object, undefined, 4);
// };

module.exports.encodeAddress = (address) => {
    return encodeURIComponent(address)
};

module.exports.isOkRequest = (request) => {
    return request.statusCode === 200;
};

module.exports.isAtLeastOneResult = (body) => {
    return !(body.status === 'ZERO_RESULTS');
};