/**
 * Created by krzysztofkicinger on 23/08/2017.
 */

console.log('Starting app...');

setTimeout(() => {
    console.log('Inside of callback');
}, 1000);

setTimeout(() => {
    console.log('Zero delay...');
}, 0);

console.log('Finishing up...');