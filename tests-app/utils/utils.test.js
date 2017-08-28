const utils = require('./utils');

it('Should add two numbers', () => {
    const result = utils.add(2, 3);

    if(result !== 5) {
        throw new Error(`Expected 44, but got ${result}`);
    }
});

it('Should square a number', () => {
    const result = utils.square(2);

    if(result !== 4) {
        throw new Error(`Expected 4, but got ${result}`);
    }

});
