const expect = require('expect');

describe('App', () => {

    it('Should call the spy correctly', () => {
        const spy = expect.createSpy();
        spy('Andrew', 25);
        expect(spy)
            .toHaveBeenCalled()
            .toHaveBeenCalledWith('Andrew', 25);
    });

});