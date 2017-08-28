module.exports.add = (a, b) => a + b;

module.exports.square = (x) => Math.pow(x, 2);

module.exports.setName = (user, fullName) => {
    const names = fullName.split(' ');
    user.firstName = names[0];
    user.lastName = names[1];
};