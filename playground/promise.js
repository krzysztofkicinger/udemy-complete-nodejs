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