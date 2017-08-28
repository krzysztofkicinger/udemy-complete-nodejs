const utils = require('./utils');
const expect = require('expect');

it('Should add two numbers', () => {
    const result = utils.add(2, 3);
    expect(result).toBeA('number').toBe(5);
});

it('Should square a number', () => {
    const result = utils.square(2);
    expect(result).toBeA('number').toBe(4);
});
