/**
 * Created by krzysztofkicinger on 23/08/2017.
 */

const square = x => x * x;
console.log(square(9));

const user = {
    name: 'Chris',
    sayHi: () => {
        console.log(arguments);
        console.log(`Hi. I'm ${this.name}`);
    },

    sayHiAlt() {
        console.log(arguments);
        console.log(`Hi. I'm ${this.name}`);
    }

};

user.sayHi();
user.sayHiAlt();