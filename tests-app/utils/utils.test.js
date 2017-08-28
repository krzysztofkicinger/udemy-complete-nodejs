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

it('Should expect some values', () => {
    expect(12).toNotBe(11);

    // For objects we need to use toEqual
    // expect({ name: 'Andrew' }).toBe({ name: 'Andrew' });
    expect({ name: 'Andrew' }).toEqual({ name: 'Andrew' });

    expect([2, 3, 4]).toInclude(2);
    expect([2, 3, 4]).toExclude(5);

    // Expecting an object to contain particular property
    expect({
        name: 'Andrew',
        age: 25,
        location: 'Philadelphia'
    }).toInclude({
        age: 25
    }).toExclude({
        name: 'John'
    });
});

it('Should have first name and last name with proper values', () => {
    const firstName = 'John';
    const lastName = 'Smith';
    const fullName = `${firstName} ${lastName}`;
    const user = {age: 25, location: 'Chicago'};
    utils.setName(user, fullName);
    expect(user)
        .toBeA('object')
        .toInclude({
            firstName,
            lastName,
            age: 25,
            location: 'Chicago'
        });
});

it('Should async add two numbers', (done) => {
    utils.asyncAdd(4, 3, (sum) => {
        expect(sum).toBeA('number').toBe(7);
        done();
    });
});

it('Should async square a number', (done) => {
    utils.asyncSquare(4, (square) => {
        expect(square).toBeA('number').toBe(16);
        done();
    });
});

