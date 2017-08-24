const somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('Hey. It worked!');
        reject('Unable to fulfill promise');
    }, 2000);
});

somePromise
    .then((value) => {
        console.log(value);
    }, (errorMessage) => {
        console.error(`Error: ${errorMessage}`);
    });


/* ------------------------------------------------------------ */

const asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number') {
                resolve(a+b)
            } else {
                reject('Arguments must be number');
            }
        }, 2500);
    });
};

asyncAdd(5, '7')
    .then((value) => asyncAdd(value, 33))
    .then((value) => console.log('Result: ', value))
    .catch((error) => console.log(error));