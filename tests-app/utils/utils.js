module.exports.add = (a, b) => a + b;

module.exports.asyncAdd = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b);
    }, 1000);
};

module.exports.square = (x) => Math.pow(x, 2);

module.exports.asyncSquare = (a, callback) => {
    setTimeout(() => {
        callback(Math.pow(a, 2));
    }, 1000);
};

module.exports.setName = (user, fullName) => {
    const names = fullName.split(' ');
    user.firstName = names[0];
    user.lastName = names[1];
};